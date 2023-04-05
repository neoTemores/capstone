import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TestProfile = () => {
    const { id } = useParams()

    useEffect(() => {
        console.log(id)
    }, [])
    return (
        <div>TestProfile</div>
    )
}

export default TestProfile