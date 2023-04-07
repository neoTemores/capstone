import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hideAll, showAll, hideSpecific, showSpecific, focusElement } from "../forum/helperMethods"
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllCommentsByPostId } from '../../State/comments/allComments'
import { deletePost, patchPost } from "../../State/posts/allPosts"
import NewCommentContainer from '../forum/NewCommentContainer'
import DisplayComments from '../forum/DisplayComments'
import { setLoading } from '../../State/loading'
import { BsTrash, BsSendPlus } from "react-icons/bs"
import { MdOutlineModeEdit, MdKeyboardArrowDown, MdSaveAs } from "react-icons/md"
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2"
import { FcCancel } from "react-icons/fc"


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
        hideSpecific(".addCommentBtn", e.currentTarget.dataset.id)
        hideAll(".newCommentContainer")
        let elem = showSpecific(".newCommentContainer", e.currentTarget.dataset.id)
        elem.childNodes[0].focus()
    }

    const viewEditPostTextArea = (e, title, body) => {
        setEditPostData({ title, body })
        let id = e.currentTarget.dataset.id

        hideAll(".editPostElem")
        showSpecific(".editPostElem", id)
        focusElement(".editPostTitleInput", id)
        showAll(".displayPostElem")
        hideSpecific(".displayPostElem", id)
    }

    const handleViewComments = (e) => {
        e.currentTarget.classList.toggle("rotate180")
        document.querySelectorAll(".commentsContainer").forEach(item => {
            if (item.dataset.id == e.currentTarget.dataset.id)
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

        dispatch(setLoading(true))
        Promise.resolve(dispatch(deleteAllCommentsByPostId(e.currentTarget.dataset.id)))
            .then(
                Promise.resolve(dispatch(deletePost(e.currentTarget.dataset.id)))
                    .then(() => dispatch(setLoading(false)))
            )
    }
    const handleSubmitPostUpdate = (e) => {
        let updatedPostData = {
            "id": e.currentTarget.dataset.id,
            "title": editPostData.title,
            "body": editPostData.body
        }
        dispatch(setLoading(true))
        Promise.resolve(dispatch(patchPost(updatedPostData)))
            .then(() => dispatch(setLoading(false)))
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
                @<Link to={`/profile/${elem.username}/${elem.userID}`}>
                    {elem.username}
                </Link>
                - <span className='dateStamp'>{new Date(elem.date).toDateString()}</span>
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

                    <MdKeyboardArrowDown
                        style={{ "color": "navy", "fontSize": "2rem" }}
                        onClick={handleViewComments}
                        className='viewCommentsBtn rotate180'
                        data-id={elem.id} />

                    <HiOutlineChatBubbleLeftEllipsis
                        style={{ "color": "#333", "fontSize": "1.5rem" }}
                        onClick={handleVewNewCommentTextArea}
                        data-id={elem.id}
                        className="addCommentBtn" />
                </div>

                {elem.userID === currentUser.id &&
                    <div className='postEditDeleteUpdateCancelBtnContainer'>

                        <MdOutlineModeEdit
                            style={{ "color": "navy", "fontSize": "1.5rem" }}
                            className='displayPostElem postEditDeleteBtn'
                            onClick={(e) => viewEditPostTextArea(e, elem.title, elem.body)}
                            data-id={elem.id} />

                        <BsTrash
                            style={{ "color": "red", "fontSize": "1.5rem" }}
                            className='displayPostElem postEditDeleteBtn'
                            onClick={handleDeletePost}
                            data-id={elem.id} />

                        <BsSendPlus
                            style={{ fontSize: "1.25rem", color: "green" }}
                            className='editPostElem postUpdateCancelEditBtn hide'
                            onClick={handleSubmitPostUpdate}
                            data-id={elem.id} />

                        <FcCancel
                            style={{ fontSize: "1.5rem" }}
                            className='editPostElem postUpdateCancelEditBtn hide'
                            onClick={handleCancelPostEdit} data-id={elem.id} />
                    </div>
                }
            </div>

            <NewCommentContainer elem={elem} newCommentText={newCommentText} setNewCommentText={setNewCommentText} />
            <DisplayComments elem={elem} />
        </div>
    )
}

export default Post