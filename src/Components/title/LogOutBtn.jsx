import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoggedIn } from "../../State/user/loggedIn"
import { setCurrentUser } from "../../State/user/currentUser"
import { setSavedCoins } from "../../State/wallet/savedCoins"


const LogOutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.currentUser.value)

    const handleLogOut = () => {
        // window.location.reload()
        // dispatch(setSavedCoins([]))
        dispatch(setLoggedIn(false))
        // dispatch(setCurrentUser({}))
        navigate("/")
    }

    return (
        <div className="userNameLogOutBtnContainer">
            <h4>@ {currentUser.username}</h4>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default LogOutBtn