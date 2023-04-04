import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideAll, showAll, hideSpecific, showSpecific } from "../forum/helperMethods"
import { deleteComment, patchComment } from '../../State/comments/allComments'


const Comment = ({ comment }) => {
    const dispatch = useDispatch()

    const [editText, setEditText] = useState("")
    const currentUser = useSelector(state => state.currentUser.value)

    const handleEditComment = (e, text) => {
        let id = e.target.dataset.id
        setEditText(text)

        hideAll(".editCommentTextArea")
        let textbox = showSpecific(".editCommentTextArea", id)
        textbox.focus()

        showAll(".commentBody")
        hideSpecific(".commentBody", id)

        showAll(".commentEditDeleteBtn")
        hideSpecific(".commentEditDeleteBtn", id)

        hideAll(".commentUpdateCancelEditBtn")
        showSpecific(".commentUpdateCancelEditBtn", id)
    }
    const handleCancelEdit = () => {
        hideAll(".commentUpdateCancelEditBtn")
        hideAll(".editCommentTextArea")
        showAll(".commentBody")
        showAll('.commentEditDeleteBtn')
    }
    const handleDeleteComment = (e) => {
        dispatch(deleteComment(e.target.dataset.id))
    }
    const handleUpdateComment = (e) => {
        if (editText.trim().length < 1) return;

        let updatedComment = {
            "id": e.target.dataset.id,
            "body": editText,
        }
        console.log(updatedComment)
        dispatch(patchComment(updatedComment))
        handleCancelEdit()
    }
    return (
        <div key={comment.id} className='comment'>
            <p
                data-id={comment.id}
                className='commentBody'>
                @user# {comment.userId} - {comment.body}
            </p>
            <textarea
                rows={4}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder='Comment can not be blank...'
                data-id={comment.id}
                className='editCommentTextArea hide' />

            {comment.userId == currentUser.id &&
                <div className='commentBtnsContainer'>
                    <button
                        className='commentEditDeleteBtn'
                        data-id={comment.id}
                        onClick={(e) => handleEditComment(e, comment.body)}>
                        Edit
                    </button>
                    <button
                        className='commentEditDeleteBtn'
                        onClick={handleDeleteComment}
                        data-id={comment.id}>
                        Delete
                    </button>

                    <button
                        onClick={handleUpdateComment}
                        data-id={comment.id}
                        className='commentUpdateCancelEditBtn hide'>
                        Update
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        data-id={comment.id}
                        className='commentUpdateCancelEditBtn hide'>
                        Cancel
                    </button>
                </div>
            }
        </div>
    )
}

export default Comment