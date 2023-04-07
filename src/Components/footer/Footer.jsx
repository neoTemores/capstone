import "./footer.css"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <Link to={"/about"} className="footerLink">About</Link>
                <Link className="footerLink">Spring Boot Repo</Link>
                <Link className="footerLink">React Repo</Link>
            </div>
        </div>
    )
}

export default Footer