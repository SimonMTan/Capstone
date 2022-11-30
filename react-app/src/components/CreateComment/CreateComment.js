import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import {createCommentThunk} from '../../store/comment'
import { getPostsThunk } from "../../store/post"
import './createcomment.css'
export default function CreateComments({post}){
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    // console.log(comment,post.id, 'thisisinsidecomment')

    useEffect(() => {},[])

    const handleSubmit2 = async(e) => {
        e.preventDefault();
        const info = {comment:comment}
        await dispatch(createCommentThunk(info,post.id)).then(await dispatch(getPostsThunk()))
        // console.log(comment,post.id, '##thisisinsidecomment22222')
        setComment('')
    }

    return (
        <div className="form_wrapper" >
            <form className="createcom_wrapper" onSubmit={handleSubmit2}>
                <div >
                    <input className='createcom' type='text' placeholder='Write a comment...' value={comment}
                    onChange={(e) => setComment(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button className='submit_button1'type='submit'>Create </button>
                    {/* <button onClick={() => setModalOpen(false)}>Cancel</button> */}
                </div>
            </form>
        </div>
    )
}