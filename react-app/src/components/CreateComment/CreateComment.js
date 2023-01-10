import { useState ,useEffect} from "react"
import { useDispatch} from 'react-redux'
import {createCommentThunk} from '../../store/comment'
import { getPostsThunk } from "../../store/post"
import './createcomment.css'
export default function CreateComments({post}){
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors , setErrors] = useState([])
    const [displayErrors12 , setDisplayErrors12] = useState(false)


    useEffect(() => {
        const err = []
        if(!comment) err.push("Please input something to post")
        if(comment.length > 200) err.push("Please input less than 200 characters")
        setErrors(err)
    },[comment])

    const handleSubmit2 = async(e) => {
        e.preventDefault();
        if(errors.length > 0) {
            setDisplayErrors12(true)
            return
        }
        if(errors.length === 0){
        const info = {comment:comment}
        await dispatch(createCommentThunk(info,post.id)).then(await dispatch(getPostsThunk()))
        // console.log(comment,post.id, '##thisisinsidecomment22222')
        setComment('')
        setDisplayErrors12(false)
        }
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
            <div>
                {displayErrors12?
                    <div >
                        {errors?.map((error, idx) => (
                            <div className="error235" key={idx}>{error}</div>
                        ))}
                    </div>:null}
            </div>
        </div>
    )
}
