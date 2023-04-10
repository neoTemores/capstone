import ReactDOM from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RingLoader } from 'react-spinners'

const SuccessModal = ({ userName }) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(10)

    useEffect(() => {
        setTimeout(() => {
            setTimer(prev => prev - 1)
        }, 1000);

        if (timer < 0)
            navigate("/login")
    }, [timer])
    return ReactDOM.createPortal(
        <div className='modalContainer createAcc'>

            <div className='modal createAccSuccess'>
                <div className='accountCreatedMsgContainer'>
                    <h1>Account Successfully Created</h1>
                    <h3>Thank you for joining
                        <span className='ce'> C</span>rypto
                        <span className='ce'> E</span>alge,</h3>

                    <h3 className='successH3'>
                        <span className='successAt'> @</span>
                        <span className='successUsername'>{userName}</span>
                        <span className='bang'> !</span>
                    </h3>
                    <h4>Redirecting to {" "}
                        <Link to={"/login"}>Log In</Link> page in {timer}</h4>
                </div>
            </div>

        </div>,
        document.getElementById("portal"))
}

export default SuccessModal