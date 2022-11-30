import React,{ useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCommentThunk } from '../../store/comment'
import { getPostsThunk } from '../../store/post'
import './EditComment.css'


export default function EditComment({comment,id,showEdit,setShowEdit}) {
    // console.log(comment, '!!#$this is comment', id)
    const dispatch = useDispatch()
    const [com, setCom] = useState(comment)
    // const[showEdit,setShowEdit] = useState(edit)


    const handleSubmitedit = async (e) => {
        e.preventDefault();
        const info = {comment:com}
        await dispatch(editCommentThunk(info,id)).then(await dispatch(getPostsThunk()))
        setShowEdit(true)
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
        </div>
    )
}
