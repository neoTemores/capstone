import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSignupBtns = () => {
    const navigate = useNavigate()

    return (
        <div className='loginSignupContainer'>
            <button className='navBtn logIn' onClick={() => navigate("/login")}>Log in</button>
            <button className='navBtn signUp' onClick={() => navigate("/create-acc")}>Sign up</button>
        </div>
    )
}

export default LoginSignupBtns