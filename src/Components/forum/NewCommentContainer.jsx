import { useSelector, useDispatch } from 'react-redux';
import { postNewComment } from '../../State/comments/allComments';
import { hideAll, showAll } from './helperMethods';

const NewCommentContainer = ({ elem, newCommentText, setNewCommentText }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)

    const handlePostComment = (e) => {
        if (newCommentText.trim().length < 1) return;

        const newComment = {
            "userId": currentUser.id,
            "postId": e.target.dataset.id,
            "body": newCommentText.trim(),
            "username": currentUser.username,
            "date": new Date()
        }
        dispatch(postNewComment(newComment))

        hideAll(".newCommentContainer")
        showAll(".addCommentBtn")
        setNewCommentText("")
    }

    const handleCancel = (e) => {
        showAll(".addCommentBtn")
        hideAll(".newCommentContainer")
        setNewCommentText("")
    }

    return (
        <div className='newCommentContainer hide' data-id={elem.id}>
            <textarea
                rows={4}
                value={newCommentText}
                placeholder='What do you think...'
                onChange={(e) => setNewCommentText(e.target.value)}
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