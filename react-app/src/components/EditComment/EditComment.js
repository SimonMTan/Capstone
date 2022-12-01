import React,{ useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCommentThunk } from '../../store/comment'
import { getPostsThunk } from '../../store/post'
import './EditComment.css'


export default function EditComment({comment,id,showEdit,setShowEdit}) {
    // console.log(comment, '!!#$this is comment', id)
    const dispatch = useDispatch()
    const [com, setCom] = useState(comment)
    const [errors , setErrors] = useState([])
    const [displayErrors12 , setDisplayErrors12] = useState(false)
    // const[showEdit,setShowEdit] = useState(edit)

    useEffect(() => {
        const err = []
        if(!com) err.push("Please input something to post")
        if(com.length > 200) err.push("Please input less than 200 characters")
        setErrors(err)
    },[com])

    const handleSubmitedit = async (e) => {
        e.preventDefault();
        if(errors.length > 0) {
            setDisplayErrors12(true)
            return
        }
        if(errors.length === 0){
        const info = {comment:com}
        await dispatch(editCommentThunk(info,id)).then(await dispatch(getPostsThunk()))
        setShowEdit(true)
        setDisplayErrors12(false)
        }
    }

    return (
        <div>
            <form className="editcom_wrapper" onSubmit={handleSubmitedit}>
                <div>
                    <input className='editcom'
                    type='text' value={com} onChange={(e) => setCom(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button className='submit_button2' type='submit'>submit</button>
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
