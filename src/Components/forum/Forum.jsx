import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllPosts } from "../../State/posts/allPosts"
import "./Forum.css"
const Forum = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.allPosts.value)

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])

    return (
        <div className='allPostsContainer'>
            {allPosts.map(elem =>
                <div key={elem.id} className="individualPostContainer">
                    <h3>{elem.title}</h3>
                    <p>{elem.body}</p>
                    <button>View Comments   </button>
                </div>)}

        </div>
    )
}

export default Forum