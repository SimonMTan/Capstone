import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editPostThunk } from "../../store/post"
import './Editpost.css'
function Editpost ({id,post,setModalOpen,setShowOption}) {
    const dispatch = useDispatch()
    console.log(post, 'this is post from editpost')
    // if(!post.post_msg) post.post_msg = ''
    // if(!post.post_img) post.post_msg = ''
    // if(!post.post_video) post.post_msg = ''
    console.log(post, 'after reassigning post_msg, post_img, post_video')
    const [msg , setMsg] = useState(post.post_msg)
    const [img , setImg] = useState(post.post_img)
    const [video , setVideo] = useState(post.post_video)
    // const [showModal, setShowModal] = useState(setShowModal);
    const [validationErrors, setValidationErrors] = useState([]);


    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalOpen(false)
        setShowOption(false)
        const info = {post_msg:msg, post_img:img, post_video:video}
        let editpost = await dispatch(editPostThunk(info,id))

    }

    // useEffect(() => {

    // })

    if(!user)
        return <Redirect to='/'/>

    return (
        <div>
            <h1 className='editpost'>Edit post</h1>
            {user.profile_photo ?
            <img className='profile_pic3' src={user.profile_photo}></img>:
            <img className='profile_pic3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'></img>
            }
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                    type="text" value={msg} onChange={(e) => setMsg(e.target.value)}>
                    </textarea>
                    {/* <label>Message Link</label> */}
                </div>
                {img ?
                    <div>
                        <label>Upload Image</label>
                        <input
                        type='text' value={img} onChange={(e) => setImg(e.target.value)}>
                        </input>
                    </div>
                : null}
                {video ?
                    <div>
                        <label>Upload video</label>
                        <input
                        type='text' value={video} onChange={(e) => setVideo(e.target.value)}>
                        </input>
                    </div>
                : null}
                <div>
                    <button type='submit'>Edit Post</button>
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )

}


export default Editpost
