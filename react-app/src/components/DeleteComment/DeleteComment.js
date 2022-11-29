import {Modal} from '../../context/Modal'
import React,{ useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentThunk } from '../../store/comment'
import { getPostsThunk } from '../../store/post'

export default function DeleteComment({id}){
    const dispatch = useDispatch()
    const [deleteComment, setDeleteComment] = useState(false)

    return(
        <div>
            <div onClick={() => setDeleteComment(true)}>Delete</div>
                {deleteComment && (<Modal onClose={()=> setDeleteComment(false)}>
                    <div>
                        <div>Delete Comment?</div>
                        <div>Are you sure you want to delete this comment?</div>
                        <div onClick={() => setDeleteComment(false)}>no</div>
                        <button onClick={async() => await dispatch(deleteCommentThunk(id)).then(() =>setDeleteComment(false)).then(async() =>await dispatch(getPostsThunk()))}>Delete</button>
                    </div>
                </Modal>)}
            </div>
    )
}
