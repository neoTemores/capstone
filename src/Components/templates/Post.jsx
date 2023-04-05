import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hideAll, showAll, hideSpecific, showSpecific, focusElement } from "../forum/helperMethods"
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllCommentsByPostId } from '../../State/comments/allComments'
import { deletePost, patchPost } from "../../State/posts/allPosts"
import NewCommentContainer from '../forum/NewCommentContainer'
import DisplayComments from '../forum/DisplayComments'


const Post = ({ elem }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editPostData, setEditPostData] = useState({ "title": "", "body": "" })
    const [newCommentText, setNewCommentText] = useState("")
    const currentUser = useSelector(state => state.currentUser.value)
    const loggedIn = useSelector(state => state.loggedIn.value)

    const handleVewNewCommentTextArea = (e) => {
        if (!loggedIn) return navigate("/login")
        setNewCommentText("")
        showAll(".addCommentBtn")
        hideSpecific(".addCommentBtn", e.target.dataset.id)
        hideAll(".newCommentContainer")
        let elem = showSpecific(".newCommentContainer", e.target.dataset.id)
        elem.childNodes[0].focus()
    }

    const viewEditPostTextArea = (e, title, body) => {
        setEditPostData({ title, body })
        let id = e.target.dataset.id

        hideAll(".editPostElem")
        showSpecific(".editPostElem", id)
        focusElement(".editPostTitleInput", id)
        showAll(".displayPostElem")
        hideSpecific(".displayPostElem", id)
    }

    const handleViewComments = (e) => {
        document.querySelectorAll(".commentsContainer").forEach(item => {
            if (item.dataset.id == e.target.dataset.id)
                return item.classList.toggle("hide")
        })
    }
    const handleCancelPostEdit = () => {
        hideAll(".editPostElem")
        showAll(".displayPostElem")
    }

    const handleSetEditPostData = (e) => {
        setEditPostData(prevData => {
            return { ...prevData, [e.target.name]: e.target.value }
        })
    }
    const handleDeletePost = (e) => {
        let promise = Promise.resolve(dispatch(deleteAllCommentsByPostId(e.target.dataset.id)))
        promise.then(dispatch(deletePost(e.target.dataset.id)))
    }
    const handleSubmitPostUpdate = (e) => {
        let updatedPostData = {
            "id": e.target.dataset.id,
            "title": editPostData.title,
            "body": editPostData.body
        }
        dispatch(patchPost(updatedPostData))
        handleCancelPostEdit()
    }
    return (
        <div key={elem.id} className="individualPostContainer">
            <h3
                className='displayPostElem individualPostHeader'
                data-id={elem.id}>
                {elem.title}
            </h3>
            <p className='displayPostElem individualPostBody' data-id={elem.id}>{elem.body}</p>
            <p>
                @<Link to={`/profile/${elem.userID}`}>{elem.username}</Link> - {new Date(elem.date).toDateString()}
            </p>

            <input
                className='editPostElem editPostTitleInput hide'
                name='title'
                value={editPostData.title}
                onChange={handleSetEditPostData}
                placeholder='Title can not be blank...'
                data-id={elem.id} />
            <textarea
                className='editPostElem editPostTextArea hide'
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
                            className='displayPostElem postEditDeleteBtn'
                            onClick={(e) => viewEditPostTextArea(e, elem.title, elem.body)}
                            data-id={elem.id}>
                            Edit
                        </button>
                        <button
                            className='displayPostElem postEditDeleteBtn'
                            onClick={handleDeletePost}
                            data-id={elem.id}>
                            Delete
                        </button>

                        <button
                            className='editPostElem postUpdateCancelEditBtn hide'
                            onClick={handleSubmitPostUpdate}
                            data-id={elem.id}>
                            Update
                        </button>
                        <button
                            className='editPostElem postUpdateCancelEditBtn hide'
                            onClick={handleCancelPostEdit} data-id={elem.id}>
                            Cancel
                        </button>
                    </div>
                }
            </div>

            <NewCommentContainer elem={elem} newCommentText={newCommentText} setNewCommentText={setNewCommentText} />
            <DisplayComments elem={elem} />
        </div>
    )
}

export default Post