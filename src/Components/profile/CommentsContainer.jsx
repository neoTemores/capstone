import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Comment from '../templates/Comment'
import Pagination from '../templates/Pagination'


const CommentsContainer = () => {
    const userProfile = useSelector(state => state.userProfile.value)
    const [startIndexComments, setStartIndexComments] = useState(0)
    const [lastIndexComments, setLastIndexComments] = useState(3)

    let slicedComments = userProfile?.userComments?.commentList?.slice(startIndexComments, lastIndexComments)

    const updateCommentsIndex = (num) => {
        setStartIndexComments(prev => prev + num)
        setLastIndexComments(prev => prev + num)
    }

    useEffect(() => {
        if (slicedComments.length === 0) {
            setStartIndexComments(0)
            setLastIndexComments(3)
        }
    }, [userProfile?.userComments?.commentList?.length])

    return (
        <div className='myProfileMyCommentsContainer'>
            <h1>Comments</h1>
            {userProfile?.userComments?.commentList?.length === 0 &&
                <h3>@{userProfile.username} does not have any Comments!</h3>}

            {slicedComments.map(elem => {
                return (<Comment key={elem.id} comment={elem} location={"myprofile"} />)
            })}

            <Pagination
                startIndex={startIndexComments}
                lastIndex={lastIndexComments}
                length={userProfile?.userComments?.commentList?.length}
                updateIndex={updateCommentsIndex}
                itemsPerPage={3} />
        </div>
    )
}

export default CommentsContainer