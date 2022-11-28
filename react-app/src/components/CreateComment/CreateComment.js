import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import {createCommentThunk} from '../../store/comment'

export default function CreateComments({post}){
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    // console.log(comment,post.id, 'thisisinsidecomment')

    useEffect(() => {},[])
    
    const handleSubmit2 = async(e) => {
        e.preventDefault();
        const info = {comment:comment}
        await dispatch(createCommentThunk(info,post.id))
        // console.log(comment,post.id, '##thisisinsidecomment22222')
    }

    return (
        <div>
            <form onSubmit={handleSubmit2}>
                <div >
                    <input type='text' placeholder='Write a comment...' value={comment}
                    onChange={(e) => setComment(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button type='submit'>Create </button>
                    {/* <button onClick={() => setModalOpen(false)}>Cancel</button> */}
                </div>
            </form>
        </div>
    )
}
