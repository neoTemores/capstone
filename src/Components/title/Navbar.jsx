import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import LoginSignupBtns from "./LoginSignupBtns";
import LogOutBtn from "./LogOutBtn";
import { GiHamburgerMenu } from "react-icons/gi"
import "./title.css"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const loggedIn = useSelector(state => state.loggedIn.value);
    const currentUser = useSelector(state => state.currentUser.value)

    useEffect(() => {
        updateActiveTab()
    }, [location])

    const updateActiveTab = () => {
        document.querySelectorAll(".navLink").forEach(elem => {
            elem.classList.remove("activeLink")
            elem.id == `/${location.pathname}/${currentUser.username}/${currentUser.id}` && elem.classList.add("activeLink")

            elem.id === location.pathname && elem.classList.add("activeLink")
        })
    }
    return (
        <div className="navbarContainer">
            <h1 className="navTitle" onClick={() => navigate("/")}>Eagle Wallet</h1>
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
                                    to={`/profile/${currentUser.username}/${currentUser.id}`}
                                    id={`/profile/${currentUser.username}/${currentUser.id}`}>
                                    Profile
                                </Link>
                            </>}
                    </div>

                    <div className="standardMenu">
                        {loggedIn ? <LogOutBtn /> : <LoginSignupBtns />}
                    </div>

                    <div className="hamburgerMenuContainer">
                        <GiHamburgerMenu style={{ fontSize: "3rem" }} />
                    </div>
                </>
            }
        </div>
    )
}

export default Navbar