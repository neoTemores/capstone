import { useSelector } from 'react-redux'
import { containsComment } from './helperMethods'
import Comment from '../templates/Comment'

const DisplayComments = ({ elem }) => {
    const allComments = useSelector(state => state.allComments.value)

    return (
        <div className='commentsContainer hide' data-id={elem.id}>
            {!containsComment(elem.id, allComments) ?
                <div> No Comments...</div>
                :
                allComments.map(comment => {
                    if (comment.postId == elem.id)
                        return (
                            <Comment key={comment.id} comment={comment} location={"forum"} />
                        )
                }
                )}
        </div>
    )
}

export default DisplayComments