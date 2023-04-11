import ReactDOM from "react-dom"
import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import LogOutBtn from "./LogOutBtn"
import LoginSignupBtns from "./LoginSignupBtns"
import { AiOutlineClose } from "react-icons/ai"

const HamburgerMenu = ({ updateActiveTab }) => {
    const currentUser = useSelector(state => state.currentUser.value)
    const loggedIn = useSelector(state => state.loggedIn.value)
    const location = useLocation()


    useEffect(() => {
        updateActiveTab()
    }, [location])

    const handleSlideOut = () => {
        document.querySelector(".hamNavContainer").classList.remove("slideIn")
    }
    return (
        <div className="hamNavContainer"
            onMouseLeave={handleSlideOut}
        >

            <AiOutlineClose className="openHamIcon" onClick={handleSlideOut} />

            <Link onClick={handleSlideOut}
                className="navLink" to="/" id="/">Home
            </Link>

            <Link onClick={handleSlideOut}
                className="navLink" to="/forum" id="/forum">Forum
            </Link>

            <Link onClick={handleSlideOut}
                className="navLink" to="/wallet" id="/wallet">Wallet
            </Link>

            {loggedIn &&
                <>
                    <Link
                        onClick={handleSlideOut}
                        className="navLink"
                        to={`/profile/${currentUser.username}`}
                        id={`/profile/${currentUser.username}`}>
                        Profile
                    </Link>
                </>}


            {loggedIn ? <LogOutBtn /> : <LoginSignupBtns />}
        </div>
    )
}

export default HamburgerMenu