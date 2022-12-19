import {Modal} from '../../context/Modal'
import React,{ useState} from 'react'
import { useDispatch} from 'react-redux'
import { deleteCommentThunk } from '../../store/comment'
import { getPostsThunk } from '../../store/post'
import './Deletecomment.css'

export default function DeleteComment({id,setShowoption2}){
    const dispatch = useDispatch()
    const [deleteComment, setDeleteComment] = useState(false)

    return(
        <div>
            <div onClick={() => setDeleteComment(true)}>Delete</div>
                {deleteComment && (<Modal onClose={()=> setDeleteComment(false)}>
                    <div className='deletecom_wrapper'>
                        <div className='deletecom_wrapper2'>
                            <div className='delete_comment'>Delete Comment?</div>
                        </div>
                        <div className='areyousure'>Are you sure you want to delete this comment?</div>
                        <div className='buttonxx'>
                            <div className='buttonno' onClick={() => {setDeleteComment(false);setShowoption2(false)}}>No</div>
                            <button className='buttonyes'onClick={async() => await dispatch(deleteCommentThunk(id)).then(() =>{setDeleteComment(false);setShowoption2(false)}).then(async() =>await dispatch(getPostsThunk()))}>Delete</button>
                        </div>
                    </div>
                </Modal>)}
            </div>
    )
}
