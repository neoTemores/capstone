import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import { attemptUserLogin } from "../../State/user/currentUser"
import { setCurrentUser } from "../../State/user/currentUser"
import { fetchAllSavedCoinsByUser } from "../../State/wallet/savedCoins"
import { setLoggedIn } from "../../State/user/loggedIn"
import { BiHide } from "react-icons/bi"
import { setLoading } from "../../State/loading"
import "./landing.css"

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useRef()
    const password = useRef()
    const loginError = useRef()

    const show = (ref) => ref.current.type = "text"
    const hide = (ref) => ref.current.type = "password"

    const handleLogin = () => {
        loginError.current.classList.add("notVisible")
        const loginUser = {
            "username": userName.current.value,
            "password": password.current.value
        }
        if (!loginUser.username.length > 0 || !loginUser.password.length > 0) return;

        dispatch(setLoading(true))
        Promise.resolve(dispatch(attemptUserLogin(loginUser)))
            .then(val => {
                if (val.payload?.status === 200) {
                    dispatch(setLoggedIn(true))
                    dispatch(setCurrentUser(val.payload.user))
                    dispatch(fetchAllSavedCoinsByUser(val.payload.user.id))
                    navigate("/")
                }
                else loginError.current.classList.remove("notVisible")

                dispatch(setLoading(false))
            })
    }

    return (
        <div className="loginPageContainer">
            <h1>Welcome</h1>
            <form className="loginForm" onSubmit={e => e.preventDefault()}>
                <input ref={userName} placeholder="Username" required />

                <div className="landingPasswordContainer">
                    <input className="landingFormInput" ref={password} type="password" placeholder="Password" required />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(password)}
                        onMouseUp={() => hide(password)}
                        onMouseLeave={() => hide(password)} />
                </div>
                <div ref={loginError} className='newPostError notVisible'>Username/Password did not match</div>
                <button onClick={handleLogin} type="submit">Log in</button>
                <Link className="createAccLink" to={"/create-acc"}>Create account</Link>
            </form>
        </div>
    )
}

export default LoginPage