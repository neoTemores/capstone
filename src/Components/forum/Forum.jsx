import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchAllPosts } from "../../State/posts/allPosts"
import { fetchAllComments } from '../../State/comments/allComments'
import { setShowNewPostModal } from '../../State/posts/showNewPostModal'
import CreateNewPostModal from './CreateNewPostModal'
import Post from '../templates/Post'
import Pagination from '../templates/Pagination'
import { setLoading } from '../../State/loading'
import "./Forum.css"

const Forum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allPosts = useSelector(state => state.allPosts.value)
    const showNewPostModal = useSelector(state => state.showNewPostModal.value)
    const loggedIn = useSelector(state => state.loggedIn.value)
    const [startIndex, setStartIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(5)

    useEffect(() => {
        dispatch(setLoading(true))
        Promise.resolve(dispatch(fetchAllPosts()))
            .then(() => dispatch(setLoading(false)))
        dispatch(fetchAllComments())
    }, [])

    const handleCreateThread = () => {
        if (!loggedIn) return navigate("/login")
        dispatch(setShowNewPostModal(true))
    }
    const updateIndex = (num) => {
        setStartIndex(prev => prev + num)
        setLastIndex(prev => prev + num)
    }
    return (
        <div className='allPostsContainer'>
            {showNewPostModal && <CreateNewPostModal />}
            <button
                className='createNewThreadBtn'
                onClick={handleCreateThread}>
                Create a new thread
            </button>

            {allPosts.slice(startIndex, lastIndex).map(elem =>
                <Post key={elem.id} elem={elem} />
            )}

            <Pagination
                startIndex={startIndex}
                lastIndex={lastIndex}
                length={allPosts.length}
                updateIndex={updateIndex}
                itemsPerPage={5} />
        </div>
    )
}

export default Forum

