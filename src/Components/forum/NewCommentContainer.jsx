import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { postNewComment } from '../../State/comments/allComments';
import { hideAll, showAll } from './helperMethods';

const NewCommentContainer = ({ elem, text, setText }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)

    const handlePostComment = (e) => {
        if (text.trim().length < 1) return;

        const newComment = {
            "userId": currentUser.id,
            "postId": e.target.dataset.id,
            "body": text
        }
        dispatch(postNewComment(newComment))

        hideAll(".newCommentContainer")
        showAll(".addCommentBtn")
        setText("")
    }

    const handleCancel = (e) => {
        showAll(".addCommentBtn")
        hideAll(".newCommentContainer")
        setText("")
    }

    return (
        <div className='newCommentContainer hide' data-id={elem.id}>
            <textarea
                rows={4}
                value={text}
                placeholder='What do you think...'
                onChange={(e) => setText(e.target.value)}
                data-id={elem.id}
                className='newCommentTextArea' />
            <div className='addCommentBtnContainer'>
                <button onClick={handlePostComment} data-id={elem.id}>Reply</button>
                <button onClick={handleCancel} data-id={elem.id}>Cancel</button>
            </div>

        </div>
    )
}

export default NewCommentContainer