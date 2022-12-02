import { useDispatch, useSelector } from 'react-redux'
import { deletePostThunk,getPostsThunk } from '../../store/post'


export default function Deletepost ({id,setShowOption}){
    let postid = id
    console.log(postid)

    const dispatch = useDispatch()

    const handleDelete = async() => {
        await dispatch(deletePostThunk(postid))
        await dispatch(getPostsThunk())
        setShowOption(false)
    }
    return (
        <div onClick={handleDelete}>
            Delete
        </div>
    )
}
