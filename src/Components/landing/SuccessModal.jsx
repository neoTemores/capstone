import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessModal = ({ userName }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // setTimeout(() => {
        //     navigate("/login")
        // }, 5000);
    }, [])
    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='modal'>
                <div className='accountCreatedMsgContainer'>
                    <h1>Account Successfully Created</h1>
                    <h3> Thank you for joining Ealge Wallet, @{userName} !</h3>
                    <h4>You are being redirected to the Log In page.</h4>
                </div>
            </div>
        </div>,
        document.getElementById("portal"))
}

export default SuccessModal