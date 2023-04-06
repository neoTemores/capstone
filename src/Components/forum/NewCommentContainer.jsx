import { useSelector, useDispatch } from 'react-redux';
import { postNewComment } from '../../State/comments/allComments';
import { hideAll, showAll } from './helperMethods';
import { setLoading } from '../../State/loading';
import { FcCancel } from "react-icons/fc"
import { ImReply } from "react-icons/im"

const NewCommentContainer = ({ elem, newCommentText, setNewCommentText }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)

    const handlePostComment = (e) => {
        if (newCommentText.trim().length < 1) return;

        const newComment = {
            "userId": currentUser.id,
            "postId": e.currentTarget.dataset.id,
            "body": newCommentText.trim(),
            "username": currentUser.username,
            "date": new Date()
        }

        dispatch(setLoading(true))
        let promise = Promise.resolve(dispatch(postNewComment(newComment)))
        promise.then(() => dispatch(setLoading(false)))

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

                <ImReply
                    style={{ fontSize: "1.5rem", color: "green" }}
                    className='commentUpdateCancelEditBtn'
                    onClick={handlePostComment}
                    data-id={elem.id} />

                <FcCancel
                    className='commentUpdateCancelEditBtn'
                    style={{ fontSize: "1.5rem" }}
                    onClick={handleCancel} data-id={elem.id} />
            </div>

        </div>
    )
}

export default NewCommentContainer