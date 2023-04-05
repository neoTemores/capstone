import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentUserData } from '../../State/user/currentUser'
import { BiHide } from "react-icons/bi"


const EditUserInfo = ({ setEditinguser }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.value)
    const password = useRef()
    const confirmPassword = useRef()
    const emailError = useRef()
    const passwordError = useRef()

    const [profileData, setProfileData] = useState({
        "id": currentUser.id,
        "email": currentUser.email,
        "password": currentUser.password,
        "bio": currentUser.bio
    })

    const handleSaveChanges = (e) => {
        e.preventDefault()
        if (isValidData()) {
            dispatch(updateCurrentUserData(profileData))
            setEditinguser(false)
        }
    }

    const isValidData = () => {
        let isValidData = true
        emailError.current.classList.add("notVisible")
        passwordError.current.classList.add("notVisible")

        if (profileData.password !== confirmPassword.current.value) {
            passwordError.current.classList.remove("notVisible")
            isValidData = false
        }
        if (profileData.email.length < 1) {
            emailError.current.classList.remove("notVisible")
            isValidData = false
        }
        return isValidData
    }

    const handleChange = (e) => {
        setProfileData(prevData => { return { ...prevData, [e.target.name]: e.target.value } })
    }

    const show = (ref) => ref.current.type = "text"
    const hide = (ref) => ref.current.type = "password"

    return (
        <form >
            <div>
                Email:
                <input
                    required
                    value={profileData.email}
                    name='email'
                    onChange={handleChange}
                    placeholder='your-email@email.com'
                    className='editUserInput'
                    type='email' />
                <div ref={emailError} className='newPostError notVisible'>Email can not be blank</div>

            </div>

            <div>
                Password:
                <div className='passwordFieldContainer'>
                    <input
                        ref={password}
                        name='password'
                        onChange={handleChange}
                        type="password"
                        className='editUserInput password'
                        value={profileData.password} />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(password)}
                        onMouseUp={() => hide(password)}
                        onMouseLeave={() => hide(password)} />
                </div>
            </div>
            <div>
                Confirm password:
                <div className='passwordFieldContainer'>
                    <input
                        ref={confirmPassword}
                        type="password"
                        className='editUserInput password' />
                    <BiHide
                        className='toggleViewPasswordIcon'
                        onMouseDown={() => show(confirmPassword)}
                        onMouseUp={() => hide(confirmPassword)}
                        onMouseLeave={() => hide(confirmPassword)} />
                </div>

                <div ref={passwordError} className='newPostError notVisible'>Passwords must match</div>
            </div>
            <div>
                <textarea
                    name='bio'
                    placeholder='Tell us a little bit about yourself!'
                    onChange={handleChange}
                    rows={8}
                    className='editUserBioTextArea'
                    value={profileData.bio} />

            </div>

            <div className='userDataEditDeleteBtnContainer'>
                <button type="submit" onClick={handleSaveChanges}>Save changes</button>
                <button onClick={() => setEditinguser(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default EditUserInfo