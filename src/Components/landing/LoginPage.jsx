import { Link } from "react-router-dom"
import { useRef } from "react"
import { BiHide } from "react-icons/bi"
import "./landing.css"

const LoginPage = () => {
    const password = useRef()

    const show = (ref) => ref.current.type = "text"
    const hide = (ref) => ref.current.type = "password"
    return (
        <div className="loginPageContainer">
            <h1>Welcome to Eagle Wallet</h1>
            <form className="loginForm" onSubmit={e => e.preventDefault()}>
                <input placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                {/* <div className='loginPasswordContainer'>
                    <input ref={password} type="password" placeholder="Password" required />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(password)}
                        onMouseUp={() => hide(password)}
                        onMouseLeave={() => hide(password)} />
                </div> */}
                <button type="submit">Log in</button>
                <Link className="createAccLink" to={"/create-acc"}>Create account</Link>
            </form>
        </div>
    )
}

export default LoginPage