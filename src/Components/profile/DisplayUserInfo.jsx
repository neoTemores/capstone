import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const DisplayUserInfo = ({ setEditinguser }) => {
    const currentUser = useSelector(state => state.currentUser.value)


    const hidePassword = () => new Array(currentUser.password.length).fill("*").join("")
    return (
        <>
            <div><span>Username: </span>{currentUser.username}</div>

            <div><span>Password: </span>{hidePassword()}</div>

            <div><span>Email: </span>PlaceHoder@currentUser.email</div>

            <div><span>Member since: </span>current/User/date</div>

            <div><span>Bio: </span>{currentUser.bio}</div>

            <div className='userDataEditDeleteBtnContainer'>
                <button onClick={() => setEditinguser(true)}>Edit my profile</button>
                <button>Delete profile</button>
            </div>
        </>
    )
}

export default DisplayUserInfo