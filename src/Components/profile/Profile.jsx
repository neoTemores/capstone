import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import "./profile.css"
import DisplayUserInfo from './DisplayUserInfo'
import EditUserInfo from './EditUserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, setUserProfile } from '../../State/profile/userProfile'
import { fetchProfileCoinDetails, setProfileCoinDetails } from '../../State/profile/profileCoinDetails'
import Post from '../templates/Post'
import Comment from '../templates/Comment'
import Pagination from '../templates/Pagination'
import { getImg } from '../home/helperMethods'
import { setLoading } from '../../State/loading'

const Profile = () => {
    const { username } = useParams()
    const fetched = useRef(false)
    const dispatch = useDispatch()
    const [editingUser, setEditinguser] = useState(false)
    const userProfile = useSelector(state => state.userProfile.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const allPosts = useSelector(state => state.allPosts.value)
    const allComments = useSelector(state => state.allComments.value)
    const profileCoinDetails = useSelector(state => state.profileCoinDetails.value)

    const [startIndexPost, setStartIndexPost] = useState(0)
    const [lastIndexPost, setLastIndexPost] = useState(3)
    const [startIndexComments, setStartIndexComments] = useState(0)
    const [lastIndexComments, setLastIndexComments] = useState(3)
    const [startIndexCoins, setStartIndexCoins] = useState(0)
    const [lastIndexCoins, setLastIndexCoins] = useState(4)


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


    const updatePostIndex = (num) => {
        setStartIndexPost(prev => prev + num)
        setLastIndexPost(prev => prev + num)
    }

    const updateCommentsIndex = (num) => {
        setStartIndexComments(prev => prev + num)
        setLastIndexComments(prev => prev + num)
    }
    const updateCoinsIndex = (num) => {
        setStartIndexCoins(prev => prev + num)
        setLastIndexCoins(prev => prev + num)
    }
    return (
        <div className='profilePageContainer'>
            <h1 className='profilePageHeader'>Welcome to @{userProfile.username}'s Page</h1>
            <div className='myProfileMyPostsContainer'>
                <h1>Posts</h1>
                {userProfile?.userPosts?.posts?.length === 0 && <h3>@{userProfile.username} does not have any Posts!</h3>}
                {userProfile?.userPosts?.posts?.slice(startIndexPost, lastIndexPost).map(elem => {
                    return (
                        <Post key={elem.id} elem={elem} />
                    )
                })}

                <Pagination
                    startIndex={startIndexPost}
                    lastIndex={lastIndexPost}
                    length={userProfile?.userPosts?.posts?.length}
                    updateIndex={updatePostIndex}
                    itemsPerPage={3} />
            </div>


            <div className='myProfileMyCommentsContainer'>
                <h1>Comments</h1>
                {userProfile?.userComments?.commentList?.length === 0 &&
                    <h3>@{userProfile.username} does not have any Comments!</h3>}

                {userProfile?.userComments?.commentList?.slice(startIndexComments, lastIndexComments).map(elem => {
                    return (<Comment key={elem.id} comment={elem} location={"myprofile"} />)
                })}

                <Pagination
                    startIndex={startIndexComments}
                    lastIndex={lastIndexComments}
                    length={userProfile?.userComments?.commentList?.length}
                    updateIndex={updateCommentsIndex}
                    itemsPerPage={3} />
            </div>

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
            <div className='myProfileCoinsContainer'>
                <h1>Coins</h1>
                <div className='userProfileCoinsData'>

                    {profileCoinDetails.length === 0 ? <h3>No coins in Wallet</h3>
                        :
                        <div className="userProfileCoinsContainer headers">
                            <div className="gridHeader">Currency</div>
                            <div className="gridHeader profileCoinChange">Change</div>
                        </div>}

                    {profileCoinDetails?.slice(startIndexCoins, lastIndexCoins).map(elem =>

                        <div className="userProfileCoinsContainer" key={elem.id}>

                            <div className="imgSymbolCointainer">
                                <img src={getImg(elem.symbol)} height="32" />
                                <div>
                                    <div>{elem.name}</div>
                                    <div className="symbol">{elem.symbol}</div>
                                </div>
                            </div>

                            <div className='profileCoinChange'
                                style={{ "color": elem.changePercent24Hr < 0 ? "red" : "green" }}>
                                {elem.changePercent24Hr.toFixed(2)}%
                            </div>

                        </div>
                    )}
                </div>
                <Pagination
                    startIndex={startIndexCoins}
                    lastIndex={lastIndexCoins}
                    length={profileCoinDetails.length}
                    updateIndex={updateCoinsIndex}
                    itemsPerPage={4}
                />
            </div>
        </div>
    )
}

export default Profile
