import { useSelector, useDispatch } from 'react-redux'
import { deleteComment, patchComment } from '../../State/comments/allComments'
import { hideAll, showAll, hideSpecific, showSpecific, containsComment } from './helperMethods'
import { useState } from 'react'

const DisplayComments = ({ elem }) => {
    const dispatch = useDispatch()
    const allComments = useSelector(state => state.allComments.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const [editText, setEditText] = useState("")

    const handleDeleteComment = (e) => {
        dispatch(deleteComment(e.target.dataset.id))
    }

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

    const handleUpdateComment = (e) => {
        if (editText.trim().length < 1) return;

        let updatedComment = {
            "id": e.target.dataset.id,
            "body": editText,
        }
        dispatch(patchComment(updatedComment))
        handleCancelEdit()
    }

    return (
        <div className='commentsContainer hide' data-id={elem.id}>
            {!containsComment(elem.id, allComments) ?
                <div> No Comments...</div>
                :
                allComments.map(comment => {
                    if (comment.postId == elem.id)
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
                )}
        </div>
    )
}

export default DisplayComments