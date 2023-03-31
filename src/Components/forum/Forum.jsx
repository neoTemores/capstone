import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllPosts } from "../../State/posts/allPosts"
import { fetchAllComments } from '../../State/comments/allComments'
import "./Forum.css"

const Forum = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.allPosts.value)
    const allComments = useSelector(state => state.allComments.value)



    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [])

    const handleViewComments = async (e) => {
        let commentsList = document.querySelectorAll(".commentsContainer")

        commentsList.forEach(item => {
            if (item.dataset.postId == e.target.dataset.postId) {
                item.classList.toggle("hide")
                item.childNodes[0].focus()
            }

        })
    }

    const handleAddcomment = async (e) => {
        let newCommentContainerList = document.querySelectorAll(".newCommentContainer")
        newCommentContainerList.forEach(item => {
            if (item.dataset.postId == e.target.dataset.postId) {
                item.classList.toggle("hide")
                item.childNodes[0].focus()
            }
        })
    }

    return (
        <div className='allPostsContainer'>
            {allPosts.map(elem =>
                <div key={elem.id} className="individualPostContainer">
                    <h3>{elem.title}</h3>
                    <p>{elem.body}</p>
                    <p>{elem.id}</p>

                    <div className='postBtnContainer'>
                        <button onClick={handleViewComments} data-post-id={elem.id}>View Comments</button>
                        <button onClick={handleAddcomment} data-post-id={elem.id}>Add Comment</button>
                    </div>

                    <div className='newCommentContainer hide' data-post-id={elem.id}>
                        <textarea
                            data-post-id={elem.id}
                            className='newCommentTextArea' />
                        <button>Add</button>
                    </div>


                    <div className='commentsContainer hide' data-post-id={elem.id}>
                        {allComments.map(comment => {
                            if (comment.postId == elem.id)
                                return (
                                    <div key={comment.id} className='comment'>
                                        <span>#{comment.id} </span>
                                        <span>{comment.body} -user: {comment.userId}</span>
                                    </div>)
                        })}
                    </div>
                </div>)}

        </div>
    )
}

export default Forum