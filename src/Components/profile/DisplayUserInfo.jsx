import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const DisplayUserInfo = ({ setEditinguser }) => {
    const currentUser = useSelector(state => state.currentUser.value)
    const [memberString, setMemberString] = useState("")
    const [userDate, setUserDate] = useState("")

    useEffect(() => {
        if (currentUser.date)
            calcDaysOfMembership()
    }, [])

    const calcDaysOfMembership = () => {
        let splitDate = currentUser.date.split("-");
        let userJoinedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
        setUserDate(userJoinedDate.toDateString())

        let diff = new Date(new Date().getTime() - userJoinedDate.getTime())

        let years = diff.getUTCFullYear() - 1970
        let months = diff.getUTCMonth()
        let days = diff.getUTCDate()

        pasrseMembership(years, months, days)
    }

    const pasrseMembership = (years, months, days) => {
        let y = years == 1 ? "" : "s"
        let m = months == 1 ? "" : "s"
        let d = days == 1 ? "" : "s"

        setMemberString(`Eagle for ${years} year${y}, ${months} month${m} and ${days} day${d}`)
    }

    const hidePassword = () => new Array(currentUser.password.length).fill("*").join("")

    return (
        <>
            <div><h3>{memberString}</h3></div>
            <div><span>Username: </span>{currentUser.username}</div>

            <div><span>Password: </span>{hidePassword()}</div>

            <div><span>Email: </span>{currentUser.email}</div>

            <div><span>Member since: </span>{userDate}</div>

            <div><span>Bio: </span>{currentUser.bio}</div>

            <div className='userDataEditDeleteBtnContainer'>
                <button onClick={() => setEditinguser(true)}>Edit my profile</button>
                <button>Delete profile</button>
            </div>
        </>
    )
}

export default DisplayUserInfo