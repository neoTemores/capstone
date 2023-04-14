import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiArrowGoBackFill } from "react-icons/ri"
import { IoPersonRemoveOutline } from "react-icons/io5"
import { USER_URL } from '../../State/url';

const DeleteProfileModal = ({ setShowDeleteProfileModal }) => {
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.currentUser.value)

    const handleDeleteProfile = async () => {
        const res = await fetch(USER_URL.DELETE + currentUser.id, { method: "DELETE" })

        if (res.status === 202)
            handleLogOut()
    }
    const handleLogOut = () => {
        localStorage.removeItem('cryptoEagleUser')
        navigate("/")
        window.location.reload()
    }

    return ReactDOM.createPortal(
        <div className='modalContainer deleteProfile'>
            <div className='modal deleteProfile'>
                <h1>WAIT!! Deleting your profile is permanent!</h1>
                <h2>Do you wish to continue?</h2>
                <div className="deleteProfileBtnContainer">
                    <button
                        className='editProfileBtn save'
                        onClick={() => setShowDeleteProfileModal(false)}>
                        <RiArrowGoBackFill className='editProfileIcon' style={{ fontSize: "1.5rem", color: "green" }} /> NO Go Back
                    </button>

                    <button
                        className='editProfileBtn delete'
                        onClick={handleDeleteProfile}>
                        <IoPersonRemoveOutline className='editProfileIcon' style={{ fontSize: "1.4rem", color: "red" }} /> YES Delete Profile
                    </button>
                </div>
            </div>

        </div>,
        document.getElementById("portal"))
}

export default DeleteProfileModal