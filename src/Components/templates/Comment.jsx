import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideAll, showAll, hideSpecific, showSpecific } from "../forum/helperMethods"
import { deleteComment, patchComment } from '../../State/comments/allComments'


const Comment = ({ comment, location }) => {
    const dispatch = useDispatch()

    const [editText, setEditText] = useState("")
    const currentUser = useSelector(state => state.currentUser.value)

    const handleEditComment = (e, text) => {
        let id = e.target.dataset.id
        setEditText(text)

        hideAll(".editCommentElem")
        let textbox = showSpecific(".editCommentElem", id)
        textbox.focus()

        showAll(".displayCommentElem")
        hideSpecific(".displayCommentElem", id)
    }

    const handleCancelEdit = () => {
        hideAll(".editCommentElem")
        showAll(".displayCommentElem")
    }

    const handleDeleteComment = (e) => {
        dispatch(deleteComment(e.target.dataset.commentid))
    }

    const handleUpdateComment = (e) => {
        if (editText.trim().length < 1) return;

        let updatedComment = {
            "id": e.target.dataset.commentid,
            "body": editText,
        }
        console.log(updatedComment)
        dispatch(patchComment(updatedComment))
        handleCancelEdit()
    }

    return (
        <div className='comment'>
            <p
                data-id={comment.id + location}
                className='displayCommentElem commentBody'>

                @<Link>{comment.username}</Link> - {comment.body}
                <br />
                <span>{new Date(comment.date).toDateString()}</span>
            </p>
            <textarea
                rows={4}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder='Comment can not be blank...'
                data-id={comment.id + location}
                className='editCommentElem editCommentTextArea hide' />

            {comment.userId == currentUser.id &&
                <div className='commentBtnsContainer'>
                    <button
                        className='displayCommentElem commentEditDeleteBtn'
                        data-id={comment.id + location}
                        onClick={(e) => handleEditComment(e, comment.body)}>
                        Edit
                    </button>
                    <button
                        className='displayCommentElem commentEditDeleteBtn'
                        onClick={handleDeleteComment}
                        data-commentid={comment.id}
                        data-id={comment.id + location}>
                        Delete
                    </button>

                    <button
                        onClick={handleUpdateComment}
                        data-commentid={comment.id}
                        data-id={comment.id + location}
                        className='editCommentElem commentUpdateCancelEditBtn hide'>
                        Update
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        data-id={comment.id + location}
                        className='editCommentElem commentUpdateCancelEditBtn hide'>
                        Cancel
                    </button>
                </div>
            }
        </div>
    )
}

export default Comment