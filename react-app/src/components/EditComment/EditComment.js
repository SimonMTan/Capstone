import React,{ useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editCommentThunk } from '../../store/comment'
import { getPostsThunk } from '../../store/post'


export default function EditComment({comment,id,showEdit,setShowEdit}) {
    console.log(comment, '!!#$this is comment', id)
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
            <form onSubmit={handleSubmitedit}>
                <div>
                    <input
                    type='text' value={com} onChange={(e) => setCom(e.target.value)}>
                    </input>
                    <button type='submit'>submit</button>
                </div>
            </form>
        </div>
    )
}
