import ReactDOM from 'react-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNewPostModal } from '../../State/posts/showNewPostModal'
import { addNewPost } from '../../State/posts/allPosts'
import { setLoading } from '../../State/loading'

const CreateNewPostModal = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)
    const [postData, setPostData] = useState({ "title": "", "body": "" })

    const handleSubmitNewPost = (e) => {
        e.preventDefault()
        if (foundEmptyField()) return;

        let newPost = {
            "title": postData.title.trim(),
            "body": postData.body.trim(),
            "userId": currentUser.id,
            "username": currentUser.username,
            "date": new Date()
        }
        dispatch(setLoading(true))
        let promise = Promise.resolve(dispatch(addNewPost(newPost)))
        promise.then(() => dispatch(setLoading(false)))

        dispatch(setShowNewPostModal(false))
    }

    const foundEmptyField = () => {
        let foundEmptyField = false
        let titleLength = postData.title.trim().length
        let bodyLength = postData.body.trim().length

        document.querySelectorAll(".newPostError").forEach(elem =>
            elem.classList.add("notVisible")
        )

        if (titleLength === 0 || titleLength > 255) {
            showError("titleError")
            foundEmptyField = true
        }
        if (bodyLength === 0) {
            showError("bodyError")
            foundEmptyField = true
        }
        return foundEmptyField
    }

    const showError = (idName) => {
        document.getElementById(idName).classList.remove('notVisible')
    }
    const handleChange = (e) => {
        setPostData(prevData => { return { ...prevData, [e.target.name]: e.target.value } })
    }
    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='modal'>
                <div className='newPostModalHeader'>
                    <h4>What's on your mind?</h4>
                    <button className='closeModalBtn' onClick={() => dispatch(setShowNewPostModal(false))}> X </button>
                </div>

                <form className='newPostForm'>
                    <input
                        name='title'
                        value={postData.title}
                        onChange={handleChange}
                        className='newPostTitleInput'
                        type='text'
                        autoFocus
                        placeholder="Title..."
                        required
                        title="Title can't be blank or more than 255 characters"
                    />
                    <div
                        id='titleError'
                        className='newPostError notVisible'>Title can't be blank or more than 255 characters</div>

                    <textarea
                        name='body'
                        value={postData.body}
                        onChange={handleChange}
                        className='newPostTextArea'
                        placeholder='Body...'
                        rows={10}
                        required
                        title='Body can not be blank' />
                    <div
                        id='bodyError'
                        className='newPostError notVisible'>Body can not be blank</div>

                    <button type='submit' className='submitNewThreadBtn' onClick={handleSubmitNewPost}>Create thread</button>
                </form>

            </div>
        </div>,
        document.getElementById("portal"))
}

export default CreateNewPostModal