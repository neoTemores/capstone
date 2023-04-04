import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiHide } from 'react-icons/bi'
import { USER_URL } from '../../State/url'
import SuccessModal from './SuccessModal'

const CreateAccountPage = () => {
    const email = useRef()
    const userName = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const passwordError = useRef()
    const show = (ref) => ref.current.type = "text"
    const hide = (ref) => ref.current.type = "password"
    const [showModal, setShowModal] = useState(false)

    const handleCreateAccount = (e) => {
        passwordError.current.classList.add("notVisible")

        let newUser = {
            "email": email.current.value,
            "username": userName.current.value,
            "password": password.current.value,
            "bio": ""
        }

        if (newUser.password !== confirmPassword.current.value)
            return passwordError.current.classList.remove("notVisible")

        if (newUser.password.length > 0) attemptAccountCreation(newUser)
    }

    const attemptAccountCreation = async (user) => {
        let reqBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }

        const res = await fetch(USER_URL.CREATE, reqBody)
        const data = await res.json()
        console.log(data)
        if (res.status === 200)
            setShowModal(true)
    }
    return (

        <div className="loginPageContainer">
            {showModal && <SuccessModal userName={userName.current.value} />}
            <h1>Create your account</h1>
            <form className="loginForm" onSubmit={e => e.preventDefault()}>
                <input ref={email} type="email" placeholder="E-mail" required />
                <input ref={userName} placeholder="Username" required />

                <div className="landingPasswordContainer">
                    <input className="landingFormInput" ref={password} type="password" placeholder="Password" required />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(password)}
                        onMouseUp={() => hide(password)}
                        onMouseLeave={() => hide(password)} />
                </div>

                <div className="landingPasswordContainer">
                    <input className="landingFormInput" ref={confirmPassword} type="password" placeholder="Confirm Password" required />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(confirmPassword)}
                        onMouseUp={() => hide(confirmPassword)}
                        onMouseLeave={() => hide(confirmPassword)} />
                </div>

                <div ref={passwordError} className='newPostError notVisible'>Passwords must match</div>

                <button type="submit" onClick={handleCreateAccount}>Create account</button>
                <Link className="createAccLink" to={"/login"}>Return to Log in</Link>
            </form>
        </div>
    )
}

export default CreateAccountPage