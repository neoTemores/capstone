import { useSelector, useDispatch } from 'react-redux'
import { containsComment } from './helperMethods'
import { deleteComment } from '../../State/comments/allComments'
import { hideAllEditTextAreas, showEditCommentTextArea, showAllCommentBodies, hideCurrentCommentBody, hideCommentEditDeleteBtns, showUpdateCancelEditBtns } from './helperMethods'
import { useState } from 'react'

const DisplayComments = ({ elem }) => {
    const dispatch = useDispatch()
    const allComments = useSelector(state => state.allComments.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const [editText, setEditText] = useState("")

    const handleDeleteComment = (e) => {
        dispatch(deleteComment(e.target.dataset.commentId))
    }

    const handleEditComment = (e, text) => {
        setEditText(text)

        hideAllEditTextAreas()
        showEditCommentTextArea(e)

        showAllCommentBodies()
        hideCurrentCommentBody(e)

        hideCommentEditDeleteBtns(e)
        showUpdateCancelEditBtns(e)
    }
    //TODO: Connect Update and Cancel btns

    return (
        <div className='commentsContainer hide' data-post-id={elem.id}>
            {!containsComment(elem.id, allComments) ?
                <div> No Comments...</div>
                :
                allComments.map(comment => {
                    if (comment.postId == elem.id)
                        return (
                            <div key={comment.id} className='comment'>
                                <p
                                    data-comment-id={comment.id}
                                    className='commentBody'>
                                    @user# {comment.userId} - {comment.body}
                                </p>
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    data-comment-id={comment.id}
                                    className='editCommentTextArea hide' />

                                {comment.userId == currentUser.id &&
                                    <div className='commentBtnsContainer'>
                                        <button
                                            className='commentEditDeleteBtn'
                                            onClick={handleDeleteComment}
                                            data-comment-id={comment.id}>
                                            Delete
                                        </button>
                                        <button
                                            className='commentEditDeleteBtn'
                                            data-comment-id={comment.id}
                                            onClick={(e) => handleEditComment(e, comment.body)}>
                                            Edit
                                        </button>

                                        <button
                                            data-comment-id={comment.id}
                                            className='commentUpdateCancelEditBtn hide'>
                                            Update
                                        </button>
                                        <button
                                            data-comment-id={comment.id}
                                            className='commentUpdateCancelEditBtn hide'>
                                            Cancel
                                        </button>
                                    </div>
                                }
                            </div>)
                })}
        </div>
    )
}

export default DisplayComments