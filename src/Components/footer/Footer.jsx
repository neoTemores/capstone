import "./footer.css"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <Link to={"/about"} className="footerLink">About</Link>
                <a
                    href="https://gitlab.galvanizelabs.net/cohorts/usaa-efit-vetfit/usaa-vetfit-jan-2023/student-work/team-1-capstone"
                    target="_blank"
                    className="footerLink">
                    Spring Boot Repo
                </a>
                <a
                    href="https://github.com/neoTemores/capstone"
                    target="_blank"
                    className="footerLink">
                    React Repo
                </a>
            </div>
        </div>
    )
}

export default Footer