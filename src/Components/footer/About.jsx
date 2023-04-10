import React from 'react'

const About = () => {
    return (
        <div className='aboutPageContainer'>
            <h1>About Crypto Eagle</h1>
            <p className='aboutTitleSentence'>A space for the conversation about cryptocurrency</p>

            <div>
                <h2>Users of Crypto Eagle can track their favorite cryptocurrencies' performance and exchange ideas about them with other members of our community</h2>
            </div>
            <div className='aboutListContainer'>
                <h3>How Our App Works:</h3>
                <li>We consume the CoinCap API to retrieve up-to-date cryptocurrency information</li>
                <li>Users can create accounts and select the coins they would like to follow for display on their profile</li>
                <li>As members of our community, users can share their thoughts on the crypto world and start conversations</li>
            </div>

            <div className='aboutListContainer'>
                <h3>Technolgies Used:</h3>
                <li>Languages: Java, JavaScript, MySQL</li>
                <li>Framworks: Spring Boot/JPA, React JS</li>
                <li>Deployment: AWS Elastic Beanstalk/RDS, Netlify</li>
            </div>

            <div className='aboutListContainer'>
                <h3>Team Members:</h3>
                <li>Vincent DeJesus</li>
                <li>Roshan Karki</li>
                <li>Joey King</li>
                <li>Tarrence Nichols</li>
                <li>Justin Smith</li>
                <li>Neo Temores</li>

            </div>

        </div>
    )
}

export default About