import { useState } from 'react'
import "./profile.css"
import DisplayUserInfo from './DisplayUserInfo'
import EditUserInfo from './EditUserInfo'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../State/user/userProfile'
import { fetchAllComments } from '../../State/comments/allComments'
import Post from '../templates/Post'
import Comment from '../templates/Comment'
import Pagination from '../templates/Pagination'

const Profile = () => {
    const dispatch = useDispatch()
    const [editingUser, setEditinguser] = useState(false)
    const currentUser = useSelector(state => state.currentUser.value)
    const userProfile = useSelector(state => state.userProfile.value)
    const allPosts = useSelector(state => state.allPosts.value)
    const allComments = useSelector(state => state.allComments.value)

    const [startIndexPost, setStartIndexPost] = useState(0)
    const [lastIndexPost, setLastIndexPost] = useState(3)
    const [startIndexComments, setStartIndexComments] = useState(0)
    const [lastIndexComments, setLastIndexComments] = useState(3)

    useEffect(() => {
        dispatch(fetchUserProfile(currentUser.username))
    }, [allPosts, allComments])

    useEffect(() => {
        dispatch(fetchAllComments())
    }, [])

    const updatePostIndex = (num) => {
        setStartIndexPost(prev => prev + num)
        setLastIndexPost(prev => prev + num)
    }

    const updateCommentsIndex = (num) => {
        setStartIndexComments(prev => prev + num)
        setLastIndexComments(prev => prev + num)
    }

    return (
        <div className='profilePageContainer'>
            <div className='myProfileMyPostsContainer'>
                <h1>Posts</h1>
                {userProfile?.userPosts?.posts?.length === 0 && <h3>You do not have any Posts!</h3>}
                {userProfile?.userPosts?.posts?.slice(startIndexPost, lastIndexPost).map(elem => {
                    return (
                        <Post key={elem.id} elem={elem} />
                    )
                })}
                {/* {userProfile?.userPosts?.posts?.length > 3 && <button>View all posts</button>} */}
                <Pagination
                    startIndex={startIndexPost}
                    lastIndex={lastIndexPost}
                    length={userProfile?.userPosts?.posts?.length}
                    updateIndex={updatePostIndex}
                    itemsPerPage={3} />
            </div>


            <div className='myProfileMyCommentsContainer'>
                <h1>Comments</h1>
                {userProfile?.userComments?.commentList?.length === 0 && <h3>You do not have any Comments!</h3>}
                {userProfile?.userComments?.commentList?.slice(startIndexComments, lastIndexComments).map(elem => {
                    return (
                        <Comment key={elem.id} comment={elem} location={"myprofile"} />
                    )
                })}
                {/* {userProfile?.userComments?.commentList?.length > 3 && <button>View all comments</button>} */}

                <Pagination
                    startIndex={startIndexComments}
                    lastIndex={lastIndexComments}
                    length={userProfile?.userComments?.commentList?.length}
                    updateIndex={updateCommentsIndex}
                    itemsPerPage={3} />
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
