import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DisplayUserInfo = ({ setEditinguser }) => {
    const { id } = useParams()
    const currentUser = useSelector(state => state.currentUser.value)
    const userProfile = useSelector(state => state.userProfile.value)
    const [memberString, setMemberString] = useState("")
    const [userDate, setUserDate] = useState("")

    useEffect(() => {
        if (userProfile?.date)
            calcDaysOfMembership()
    }, [userProfile])

    const calcDaysOfMembership = () => {
        let splitDate = userProfile?.date.split("-");
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

    return (
        <>
            <div><h3>{memberString}</h3></div>
            <div><span>Username: </span>{userProfile.username}</div>

            <div><span>Email: </span>{userProfile.email}</div>

            <div><span>Member since: </span>{userDate}</div>

            <div><span>Bio: </span>{userProfile.userBio}</div>

            <div className='userDataEditDeleteBtnContainer'>
                {currentUser?.id == id &&
                    <>
                        <button onClick={() => setEditinguser(true)}>Edit my profile</button>
                        <button>Delete profile</button>
                    </>
                }
            </div>
        </>
    )
}

export default DisplayUserInfo