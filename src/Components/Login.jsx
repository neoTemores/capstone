import { useState } from "react";
import { useDispatch } from "react-redux"
import { setLoggedIn } from "../features/loggedIn"

const Login = () => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({ "username": "", "password": "" })

    const handleChange = (e) => {

        setLoginData(prevData => { return { ...prevData, [e.target.name]: e.target.value } })
    }
    return (
        <div className='loginContainer'>
            <div className='loginModal'>
                <input
                    type="text"
                    placeholder="Username..."
                    value={loginData.username}
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={loginData.password}
                    name="password"
                    onChange={handleChange}

                />
                <button onClick={() => dispatch(setLoggedIn(true))}>Login</button>
                <span>Create account</span>
            </div>
        </div>
    )
}

export default Login