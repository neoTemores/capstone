import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllPosts } from "../../State/posts/allPosts"
import { fetchAllComments } from '../../State/comments/allComments'
import { setShowNewPostModal } from '../../State/posts/showNewPostModal'
import "./Forum.css"

import CreateNewPostModal from './CreateNewPostModal'
import Post from '../templates/Post'

const Forum = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.allPosts.value)
    const showNewPostModal = useSelector(state => state.showNewPostModal.value)

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [])

    return (
        <div className='allPostsContainer'>
            {showNewPostModal && <CreateNewPostModal />}
            <button
                className='createNewThreadBtn'
                onClick={() => dispatch(setShowNewPostModal(true))}>
                Create a new thread
            </button>

            {allPosts.map(elem =>
                <Post key={elem.id} elem={elem} />
            )}

        </div>
    )
}

export default Forum

