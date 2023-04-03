import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllPosts, deletePost, patchPost } from "../../State/posts/allPosts"
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
    const [newCommentText, setNewCommentText] = useState("")
    const [editPostData, setEditPostData] = useState({ "title": "", "body": "" })

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

    const handleVewNewCommentTextArea = (e) => {
        setNewCommentText("")
        showAll(".addCommentBtn")
        hideSpecific(".addCommentBtn", e.target.dataset.id)
        hideAll(".newCommentContainer")
        let elem = showSpecific(".newCommentContainer", e.target.dataset.id)
        elem.childNodes[0].focus()
    }

    const handleDeletePost = (e) => {
        let promise = Promise.resolve(dispatch(deleteAllCommentsByPostId(e.target.dataset.id)))
        promise.then(dispatch(deletePost(e.target.dataset.id)))
        // promise.then(val => console.log(val))

    }
    const viewEditPostTextArea = (e, title, body) => {
        setEditPostData({ title, body })
        let id = e.target.dataset.id
        hideAll(".editPostTitleInput")
        hideAll(".editPostTextArea")
        showSpecific(".editPostTitleInput", id)
        showSpecific(".editPostTextArea", id)

        showAll(".individualPostHeader")
        showAll(".individualPostBody")
        hideSpecific(".individualPostHeader", id)
        hideSpecific(".individualPostBody", id)

        showAll(".postEditDeleteBtn")
        hideSpecific(".postEditDeleteBtn", id)

        hideAll(".postUpdateCancelEditBtn")
        showSpecific(".postUpdateCancelEditBtn", id)
    }

    const handleCancelPostEdit = (e) => {
        let id = e.target.dataset.id
        hideSpecific(".postUpdateCancelEditBtn", id)
        showSpecific(".postEditDeleteBtn", id)

        hideSpecific(".editPostTitleInput", id)
        hideSpecific(".editPostTextArea", id)

        showAll(".individualPostHeader")
        showAll(".individualPostBody")
    }

    const handleSubmitPostUpdate = (e) => {
        let updatedPostData = {
            "id": e.target.dataset.id,
            "title": editPostData.title,
            "body": editPostData.body
        }
        dispatch(patchPost(updatedPostData))
        handleCancelPostEdit(e)
    }

    const handleSetEditPostData = (e) => {
        setEditPostData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='allPostsContainer'>
            {showNewPostModal && <CreateNewPostModal />}
            <button className='createNewThreadBtn' onClick={() => dispatch(setShowNewPostModal(true))}>Start a new thread</button>
            {allPosts.map(elem =>
                <div key={elem.id} className="individualPostContainer">
                    <h3 className='individualPostHeader' data-id={elem.id}>{elem.title}</h3>
                    <p className='individualPostBody' data-id={elem.id}>{elem.body}</p>
                    {/* <p>{elem.id}</p> */}

                    <input
                        className='editPostTitleInput hide'
                        name='title'
                        value={editPostData.title}
                        onChange={handleSetEditPostData}
                        placeholder='Title can not be blank...'
                        data-id={elem.id} />
                    <textarea
                        className='editPostTextArea hide'
                        name='body'
                        rows={4}
                        value={editPostData.body}
                        onChange={handleSetEditPostData}
                        placeholder='Body can not be blank...'
                        data-id={elem.id} />

                    <div className='postBtnContainer'>
                        <div className='postToggleAddCommentBtns'>
                            <button
                                onClick={handleViewComments}
                                data-id={elem.id}>
                                Toggle Comments
                            </button>
                            <button
                                onClick={handleVewNewCommentTextArea}
                                data-id={elem.id}
                                className="addCommentBtn">
                                Add Comment
                            </button>
                        </div>

                        {elem.userID === currentUser.id &&
                            <div className='postEditDeleteUpdateCancelBtnContainer'>
                                <button
                                    className='postEditDeleteBtn'
                                    onClick={(e) => viewEditPostTextArea(e, elem.title, elem.body)}
                                    data-id={elem.id}>
                                    Edit
                                </button>
                                <button
                                    className='postEditDeleteBtn'
                                    onClick={handleDeletePost}
                                    data-id={elem.id}>
                                    Delete
                                </button>

                                <button
                                    className='postUpdateCancelEditBtn hide'
                                    onClick={handleSubmitPostUpdate}
                                    data-id={elem.id}>
                                    Update
                                </button>
                                <button
                                    className='postUpdateCancelEditBtn hide'
                                    onClick={handleCancelPostEdit} data-id={elem.id}>
                                    Cancel
                                </button>
                            </div>
                        }
                    </div>

                    <NewCommentContainer elem={elem} newCommentText={newCommentText} setNewCommentText={setNewCommentText} />
                    <DisplayComments elem={elem} />

                </div>)}

        </div>
    )
}

export default Forum