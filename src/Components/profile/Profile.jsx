import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import DisplayUserInfo from './DisplayUserInfo'
import EditUserInfo from './EditUserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../State/profile/userProfile'
import { fetchProfileCoinDetails, setProfileCoinDetails } from '../../State/profile/profileCoinDetails'
import { setLoading } from '../../State/loading'
import PostsContainer from './PostsContainer'
import CommentsContainer from './CommentsContainer'
import CoinsContainer from './CoinsContainer'
import "./profile.css"


const Profile = () => {
    const { username } = useParams()
    const fetched = useRef(false)
    const dispatch = useDispatch()
    const [editingUser, setEditinguser] = useState(false)
    const userProfile = useSelector(state => state.userProfile.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const allPosts = useSelector(state => state.allPosts.value)
    const allComments = useSelector(state => state.allComments.value)


    useEffect(() => {
        dispatch(setLoading(true))
        Promise.resolve(dispatch(fetchUserProfile(username)))
            .then(() => dispatch(setLoading(false)))

    }, [allPosts, allComments, username, currentUser])

    useEffect(() => {
        if (!fetched.current && username == userProfile.username) {
            dispatch(setProfileCoinDetails([]))
            fetched.current = true
            userProfile?.userSavedCoins?.savedCoinsList?.forEach(elem => {
                dispatch(fetchProfileCoinDetails(elem.currencyName))
            })
        } else {
            fetched.current = false
        }
    }, [userProfile, username])


    return (
        <div className='profilePageContainer'>
            <h1 className='profilePageHeader'>Welcome to
                {currentUser.username === username ?
                    <> your profile </> :
                    <><span style={{ fontSize: "1.5rem" }}> @</span>{userProfile.username}'s </>
                }
                Page
            </h1>

            <div className='userBioContainer'>
                <h1>About</h1>
                <div className='userDisplayData'>
                    {editingUser ?
                        <EditUserInfo setEditinguser={setEditinguser} />
                        :
                        <DisplayUserInfo setEditinguser={setEditinguser} />
                    }
                </div>
            </div>

            <CoinsContainer />

            <PostsContainer />

            <CommentsContainer />

        </div>
    )
}

export default Profile
