import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { postNewComment } from '../../State/comments/allComments';
import { hideAllTextAreas, showAllAddCommentBtns } from './helperMethods';

const NewCommentContainer = ({ elem, text, setText }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)

    const handlePostComment = (e) => {
        if (text.trim().length < 1) return;

        const newComment = {
            "userId": currentUser.id,
            "postId": e.target.dataset.postId,
            "body": text
        }
        dispatch(postNewComment(newComment))

        hideAllTextAreas()
        showAllAddCommentBtns()
        setText("")
    }

    const handleCancel = (e) => {
        showAllAddCommentBtns()
        hideAllTextAreas()
        setText("")
    }

    return (
        <div className='newCommentContainer hide' data-post-id={elem.id}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-post-id={elem.id}
                className='newCommentTextArea' />
            <div className='addCommentBtnContainer'>
                <button onClick={handlePostComment} data-post-id={elem.id}>Reply</button>
                <button onClick={handleCancel} data-post-id={elem.id}>Cancel</button>
            </div>

        </div>
    )
}

export default NewCommentContainer