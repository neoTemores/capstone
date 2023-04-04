import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchAllPosts } from "../../State/posts/allPosts"
import { fetchAllComments } from '../../State/comments/allComments'
import { setShowNewPostModal } from '../../State/posts/showNewPostModal'
import "./Forum.css"

import CreateNewPostModal from './CreateNewPostModal'
import Post from '../templates/Post'

const Forum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allPosts = useSelector(state => state.allPosts.value)
    const showNewPostModal = useSelector(state => state.showNewPostModal.value)
    const loggedIn = useSelector(state => state.loggedIn.value)

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [])

    const handleCreateThread = () => {
        if (!loggedIn) return navigate("/login")
        dispatch(setShowNewPostModal(true))
    }
    return (
        <div className='allPostsContainer'>
            {showNewPostModal && <CreateNewPostModal />}
            <button
                className='createNewThreadBtn'
                onClick={handleCreateThread}>
                Create a new thread
            </button>

            {allPosts.map(elem =>
                <Post key={elem.id} elem={elem} />
            )}

        </div>
    )
}

export default Forum

