import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {createPostThunk} from '../../store/post'

function CreatePost ({setModalOpen}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    if(user.profile_img === null) user.profile_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'

    const [msg , setMsg] = useState('')
    const [img , setImg] = useState('')
    const [video , setVideo] = useState('')

    useEffect(() => {},[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalOpen(false)
        const info = {post_msg:msg, post_img:img, post_video:video}
        dispatch(createPostThunk(info))
    }

    return(
        <div>
            <h2>Create Post</h2>
            {user.profile_photo ?
            <img className='profile_pic3' src={user.profile_photo}></img>:
            <img className='profile_pic3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'></img>
            }
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                    type="text" value={msg} placeholder="What's on your mind?" onChange={(e) => setMsg(e.target.value)}>
                    </textarea>
                    {/* <label>Message Link</label> */}
                </div>

                <div>
                    <label>Photo upload</label>
                    <input
                    type='text' value={img} onChange={(e) => setImg(e.target.value)}>
                    </input>
                </div>


                <div>
                    <label>Video upload</label>
                    <input
                    type='text' value={video} onChange={(e) => setVideo(e.target.value)}>
                    </input>
                </div>

                <div>
                    <button type='submit'>Create </button>
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default CreatePost
