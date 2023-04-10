import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoggedIn } from "../../State/user/loggedIn"
import { setCurrentUser } from "../../State/user/currentUser"
import { setSavedCoins } from "../../State/wallet/savedCoins"
import { setUserProfile } from "../../State/profile/userProfile"
import { TiUser } from "react-icons/ti"


const LogOutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.currentUser.value)

    const handleLogOut = () => {
        localStorage.removeItem('cryptoEagleUser')
        dispatch(setSavedCoins([]))
        dispatch(setLoggedIn(false))
        dispatch(setCurrentUser({}))
        dispatch(setUserProfile([]))
        navigate("/")
        window.location.reload()
    }

    return (
        <div className="userNameLogOutBtnContainer hamMenuUserNameLogOutBtn">
            <h4 className="userNameLogo"><TiUser />{currentUser.username}</h4>
            <button className="navBtn logOut" onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default LogOutBtn