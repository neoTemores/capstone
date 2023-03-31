import { useSelector } from 'react-redux'
import { containsComment } from './helperMethods'

const DisplayComments = ({ elem }) => {
    const allComments = useSelector(state => state.allComments.value)
    const currentUser = useSelector(state => state.currentUser.value)

    return (
        <div className='commentsContainer hide' data-post-id={elem.id}>
            {!containsComment(elem.id, allComments) ?
                <div> No Comments...</div>
                :
                allComments.map(comment => {
                    if (comment.postId == elem.id)
                        return (
                            <div key={comment.id} className='comment'>
                                <p>@user# {comment.userId} - {comment.body}</p>
                                {comment.userId == currentUser.id &&
                                    <div className='commentBtnsContainer'>
                                        <button>Delete</button>
                                        <button>Edit</button>
                                    </div>
                                }
                            </div>)
                })}
        </div>
    )
}

export default DisplayComments