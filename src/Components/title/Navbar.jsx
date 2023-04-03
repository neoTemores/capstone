import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import LoginSignupBtns from "./LoginSignupBtns";
import "./title.css"
import LogOutBtn from "./LogOutBtn";

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const loggedIn = useSelector(state => state.loggedIn.value);

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
            <h1 className="navTitle" onClick={() => navigate("/")}>Eagle Wallet</h1>
            {location.pathname !== "/login" && location.pathname !== "/create-acc" &&
                <>
                    <div className="navLinksContainer">
                        <Link className="navLink" to="/" id="/">Home</Link>
                        <Link className="navLink" to="/forum" id="/forum">Forum</Link>
                        <Link className="navLink" to="/wallet" id="/wallet">Wallet</Link>
                        {loggedIn && <Link className="navLink" to="/profile" id="/profile">Profile</Link>}
                    </div>

                    {loggedIn ? <LogOutBtn /> : <LoginSignupBtns />}
                </>
            }
        </div>
    )
}

export default Navbar