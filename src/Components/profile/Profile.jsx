import { useState } from 'react'
import "./profile.css"
import DisplayUserInfo from './DisplayUserInfo'
import EditUserInfo from './EditUserInfo'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../State/user/userProfile'
import Post from '../templates/Post'
import Comment from '../templates/Comment'

const Profile = () => {
    const dispatch = useDispatch()
    const [editingUser, setEditinguser] = useState(false)
    const currentUser = useSelector(state => state.currentUser.value)
    const userProfile = useSelector(state => state.userProfile.value)
    const allPosts = useSelector(state => state.allPosts.value)
    const allComments = useSelector(state => state.allComments.value)

    useEffect(() => {
        dispatch(fetchUserProfile(currentUser.username))
    }, [allPosts, allComments])


    return (
        <div className='profilePageContainer'>
            <div className='myProfileMyPostsContainer'>
                <h1>Posts</h1>
                {userProfile?.userPosts?.posts?.slice(0, 3).map(elem => {
                    return (
                        <Post key={elem.id} elem={elem} />
                    )
                })}
                {userProfile?.userPosts?.posts?.length > 3 && <button>View all posts</button>}
            </div>

            <div className='myProfileMyCommentsContainer'>
                <h1>Comments</h1>
                {userProfile?.userComments?.commentList?.slice(0, 3).map(elem => {
                    return (
                        <Comment key={elem.id} comment={elem} />
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
