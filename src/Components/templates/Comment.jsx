import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideAll, showAll, hideSpecific, showSpecific, focusElement } from "../forum/helperMethods"
import { deleteComment, patchComment } from '../../State/comments/allComments'
import { setLoading } from "../../State/loading"
import { BsTrash, BsSendPlus } from "react-icons/bs"
import { MdOutlineModeEdit } from "react-icons/md"
import { FcCancel } from "react-icons/fc"


const Comment = ({ comment, location }) => {
    const dispatch = useDispatch()

    const [editText, setEditText] = useState("")
    const currentUser = useSelector(state => state.currentUser.value)

    const handleEditComment = (e, text) => {
        let id = e.currentTarget.dataset.id
        setEditText(text)

        hideAll(".editCommentElem")
        showSpecific(".editCommentElem", id)

        focusElement(".editCommentTextArea", id)
        showAll(".displayCommentElem")
        hideSpecific(".displayCommentElem", id)
    }

    const handleCancelEdit = () => {
        hideAll(".editCommentElem")
        showAll(".displayCommentElem")
    }

    const handleDeleteComment = (e) => {
        dispatch(setLoading(true))
        Promise.resolve(dispatch(deleteComment(e.currentTarget.dataset.commentid)))
            .then(() => dispatch(setLoading(false)))
    }

    const handleUpdateComment = (e) => {
        if (editText.trim().length < 1) return;

        let updatedComment = {
            "id": e.currentTarget.dataset.commentid,
            "body": editText.trim(),
        }
        dispatch(setLoading(true))
        Promise.resolve(dispatch(patchComment(updatedComment)))
            .then(() => dispatch(setLoading(false)))
        handleCancelEdit()
    }

    return (
        <div className='comment'>
            <p
                data-id={comment.id + location}
                className='displayCommentElem commentBody'>

                @<Link to={`/profile/${comment.username}/${comment.userId}`}>{comment.username}</Link> - {comment.body}
                <br />
                <span className='dateStamp'>{new Date(comment.date).toDateString()}</span>
            </p>
            <textarea
                rows={(editText.length / 100) + 2}
                cols={editText.length}
                value={editText}
                onChange={(e) => { setEditText(e.target.value) }}
                placeholder='Comment can not be blank...'
                data-id={comment.id + location}
                className='editCommentElem editCommentTextArea hide' />

            {comment.userId == currentUser.id &&
                <div className='commentBtnsContainer'>
                    <MdOutlineModeEdit
                        className='displayCommentElem commentEditDeleteBtn'
                        data-id={comment.id + location}
                        onClick={(e) => handleEditComment(e, comment.body)}
                        style={{ "color": "navy", "fontSize": "1rem" }} />

                    <BsTrash
                        className='displayCommentElem commentEditDeleteBtn'
                        onClick={handleDeleteComment}
                        data-commentid={comment.id}
                        data-id={comment.id + location}
                        style={{ "color": "red", "fontSize": "1rem" }} />

                    <BsSendPlus
                        style={{ fontSize: "1rem", color: "green" }}
                        onClick={handleUpdateComment}
                        data-commentid={comment.id}
                        data-id={comment.id + location}
                        className='editCommentElem commentUpdateCancelEditBtn hide' />

                    <FcCancel
                        style={{ fontSize: "1.1rem" }}
                        onClick={handleCancelEdit}
                        data-id={comment.id + location}
                        className='editCommentElem commentUpdateCancelEditBtn hide' />

                </div>
            }
        </div>
    )
}

export default Comment
