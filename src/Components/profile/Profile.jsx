import { useState } from 'react'
import "./profile.css"
import DisplayUserInfo from './DisplayUserInfo'
import EditUserInfo from './EditUserInfo'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../State/user/userProfile'

const Profile = () => {
    const dispatch = useDispatch()
    const [editingUser, setEditinguser] = useState(false)
    const currentUser = useSelector(state => state.currentUser.value)
    const userProfile = useSelector(state => state.userProfile.value)

    useEffect(() => {
        dispatch(fetchUserProfile(currentUser.username))
    }, [])

    useEffect(() => {
        console.log(userProfile)
    }, [userProfile])

    return (
        <div className='profilePageContainer'>
            <div className='myProfileMyPostsContainer'>
                <h1>Posts</h1>
                {userProfile?.userPosts?.posts?.slice(0, 3).map(elem => {
                    return (
                        <div key={elem.id} className='individualPostContainer'>
                            <h3>{elem.title}</h3>
                            <p>{elem.body}</p>
                            <div className='postEditDeleteUpdateCancelBtnContainer myPosts'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    )
                })}
                {userProfile?.userPosts?.posts?.length > 3 && <button>View all posts</button>}
            </div>

            <div className='myProfileMyCommentsContainer'>
                <h1>Comments</h1>
                {userProfile?.userComments?.commentList?.slice(0, 3).map(elem => {
                    return (
                        <div key={elem.id} className='individualPostContainer'>
                            <p>{elem.body}</p>
                            <div className='commentBtnsContainer myComments'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    )
                })}
                {userProfile?.userComments?.commentList?.length > 3 && <button>View all comments</button>}
            </div>
            <div className='userDisplayData'>

                {editingUser ?
                    <EditUserInfo setEditinguser={setEditinguser} />
                    :
                    <DisplayUserInfo setEditinguser={setEditinguser} />
                }
            </div>
        </div>
    )
}

export default Profile