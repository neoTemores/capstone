import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoggedIn } from "../../State/user/loggedIn"
import { setCurrentUser } from "../../State/user/currentUser"

const LogOutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.currentUser.value)

    const handleLogOut = () => {
        navigate("/")
        dispatch(setLoggedIn(false))
        dispatch(setCurrentUser({}))
    }

    return (
        <div className="userNameLogOutBtnContainer">
            <h4>@ {currentUser.username}</h4>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default LogOutBtn