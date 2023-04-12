import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Post from "../templates/Post"
import Pagination from "../templates/Pagination"
import { fetchAllComments } from "../../State/comments/allComments"

const PostsContainer = () => {
    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile.value)
    const allComments = useSelector(state => state.allComments.value)
    const currentUser = useSelector(state => state.currentUser.value)
    const [startIndexPost, setStartIndexPost] = useState(0)
    const [lastIndexPost, setLastIndexPost] = useState(3)

    let slicedPosts = userProfile?.userPosts?.posts?.slice(startIndexPost, lastIndexPost)

    const updatePostIndex = (num) => {
        setStartIndexPost(prev => prev + num)
        setLastIndexPost(prev => prev + num)
    }

    useEffect(() => {
        if (allComments.length === 0)
            dispatch(fetchAllComments())
    }, [])

    useEffect(() => {
        if (slicedPosts?.length === 0) {
            setStartIndexPost(0)
            setLastIndexPost(3)
        }

    }, [userProfile?.userPosts?.posts?.length])

    return (
        <div className='myProfileMyPostsContainer'>
            <h1><span className='profileFirstLetter'>P</span>osts</h1>
            {userProfile?.userPosts?.posts?.length === 0 &&
                <div className="noProfilePostsContainer">
                    <h3>
                        {userProfile?.user?.username === currentUser.username ? "You do " : `@${userProfile.username} does `}
                        not have any Posts!
                    </h3>

                </div>}
            {slicedPosts?.map(elem => {
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
    )
}

export default PostsContainer