import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import LoginSignup from "./LoginSignup";
import "./title.css"

const Navbar = () => {

    const loggedIn = useSelector(state => state.loggedIn.value);

    return (
        <div className="navbarContainer">
            <h1 className="navTitle">Eagle Wallet</h1>

            <div className="navLinksContainer">
                <Link className="navLink" to="/" id="">Home</Link>
                <Link className="navLink" to="/forum" id="">Forum</Link>
                <Link className="navLink" to="/wallet" id="">Wallet</Link>
                {loggedIn && <Link className="navLink" to="/profile" id="">Profile</Link>}
            </div>

            {!loggedIn && <LoginSignup />}
        </div>
    )
}

export default Navbar