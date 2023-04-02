import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllPosts, deletePost } from "../../State/posts/allPosts"
import { fetchAllComments, deleteAllCommentsByPostId } from '../../State/comments/allComments'
import { setShowNewPostModal } from '../../State/posts/showNewPostModal'
import { hideAll, showAll, hideSpecific, showSpecific } from './helperMethods'
import "./Forum.css"
import DisplayComments from './DisplayComments'
import NewCommentContainer from './NewCommentContainer'
import CreateNewPostModal from './CreateNewPostModal'

const Forum = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.allPosts.value)
    const showNewPostModal = useSelector(state => state.showNewPostModal.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const [text, setText] = useState("")

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [])

    const handleViewComments = (e) => {
        document.querySelectorAll(".commentsContainer").forEach(item => {
            if (item.dataset.id == e.target.dataset.id)
                return item.classList.toggle("hide")
        })
    }

    const handleVewTextArea = (e) => {
        setText("")
        showAll(".addCommentBtn")
        hideSpecific(".addCommentBtn", e.target.dataset.id)
        hideAll(".newCommentContainer")
        let elem = showSpecific(".newCommentContainer", e.target.dataset.id)
        elem.childNodes[0].focus()
    }
    //TODO: Dynamically render edit/delete post btns based on current logged in user
    //Must delete all comments before sending delete post request

    const handleDeletePost = (e) => {
        let promise = Promise.resolve(dispatch(deleteAllCommentsByPostId(e.target.dataset.id)))
        promise.then(dispatch(deletePost(e.target.dataset.id)))
        // promise.then(val => console.log(val))

    }
    const viewEditPostTextArea = (e) => {
        console.log(e.target.dataset.id)

    }

    return (
        <div className='allPostsContainer'>
            {showNewPostModal && <CreateNewPostModal />}
            <button className='createNewThreadBtn' onClick={() => dispatch(setShowNewPostModal(true))}>Start a new thread</button>
            {allPosts.map(elem =>
                <div key={elem.id} className="individualPostContainer">
                    <h3>{elem.title}</h3>
                    <p>{elem.body}</p>
                    <p>{elem.id}</p>

                    <div className='postBtnContainer'>
                        <div>
                            <button
                                onClick={handleViewComments}
                                data-id={elem.id}>
                                Toggle Comments
                            </button>
                            <button
                                onClick={handleVewTextArea}
                                data-id={elem.id}
                                className="addCommentBtn">
                                Add Comment
                            </button>
                        </div>

                        {elem.userID === currentUser.id &&
                            <div>
                                <button
                                    onClick={viewEditPostTextArea}
                                    data-id={elem.id}>
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    data-id={elem.id}>
                                    Delete
                                </button>
                            </div>
                        }
                    </div>

                    <NewCommentContainer elem={elem} text={text} setText={setText} />
                    <DisplayComments elem={elem} />

                </div>)}

        </div>
    )
}

export default Forum