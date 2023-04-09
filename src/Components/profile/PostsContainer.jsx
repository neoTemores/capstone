import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Post from "../templates/Post"
import Pagination from "../templates/Pagination"

const PostsContainer = () => {
    const userProfile = useSelector(state => state.userProfile.value)
    const [startIndexPost, setStartIndexPost] = useState(0)
    const [lastIndexPost, setLastIndexPost] = useState(3)

    let slicedPosts = userProfile?.userPosts?.posts?.slice(startIndexPost, lastIndexPost)

    const updatePostIndex = (num) => {
        setStartIndexPost(prev => prev + num)
        setLastIndexPost(prev => prev + num)
    }

    useEffect(() => {
        if (slicedPosts.length === 0) {
            setStartIndexPost(0)
            setLastIndexPost(3)
        }

    }, [userProfile?.userPosts?.posts?.length])

    return (
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
    )
}

export default PostsContainer