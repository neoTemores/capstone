import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import LoginSignupBtns from "./LoginSignupBtns";
import LogOutBtn from "./LogOutBtn";
import { GiHamburgerMenu } from "react-icons/gi"
import "./title.css"
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const loggedIn = useSelector(state => state.loggedIn.value);
    const currentUser = useSelector(state => state.currentUser.value)
    const [showHamMenu, setShowHamMenu] = useState(false)

    useEffect(() => {
        updateActiveTab()
    }, [location])


    const updateActiveTab = () => {
        document.querySelectorAll(".navLink").forEach(elem => {
            elem.classList.remove("activeLink")
            elem.id === location.pathname && elem.classList.add("activeLink")
        })
    }
    return (
        <div className="navbarContainer">
            <h1 className="navTitle" onClick={() => navigate("/")}>Crypto Eagle</h1>
            {location.pathname !== "/login" && location.pathname !== "/create-acc" &&
                <>
                    <div className="navLinksContainer standardMenu">
                        <Link className="navLink" to="/" id="/">Home</Link>
                        |
                        <Link className="navLink" to="/forum" id="/forum">Forum</Link>
                        |
                        <Link className="navLink" to="/wallet" id="/wallet">Wallet</Link>
                        {loggedIn &&
                            <>
                                |
                                <Link
                                    className="navLink"
                                    to={`/profile/${currentUser.username}`}
                                    id={`/profile/${currentUser.username}`}>
                                    Profile
                                </Link>
                            </>}
                    </div>

                    <div className="standardMenu">
                        {loggedIn ? <LogOutBtn /> : <LoginSignupBtns />}
                    </div>

                    <div className="hamburgerMenuContainer">
                        <GiHamburgerMenu onClick={() => setShowHamMenu(true)} style={{ fontSize: "3rem" }} />
                        {showHamMenu && <HamburgerMenu setShowHamMenu={setShowHamMenu} updateActiveTab={updateActiveTab} />}
                    </div>
                </>
            }
        </div>
    )
}

export default Navbar