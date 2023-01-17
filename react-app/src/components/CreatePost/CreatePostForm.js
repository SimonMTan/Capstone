import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import {createPostThunk} from '../../store/post'
import './Createpostform.css'

function CreatePost ({setModalOpen}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    if(user.profile_img === null) user.profile_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'

    const [msg , setMsg] = useState('')
    const [img , setImg] = useState('')
    const [video , setVideo] = useState('')
    const [errors , setErrors] = useState([])
    const [displayErrors , setDisplayErrors] = useState(false)

    useEffect(() => {
        const err = []
        if(!msg && !img && !video) err.push("Please input something to post")
        if(img){
            if(!img.endsWith('.jpg') && !img.endsWith('.png') && !img.endsWith('.jpeg') && !img.endsWith('.gif')) err.push("Please input a valid image link(.jpg/.png/.jpeg/.gif)")
        }
        if(video){
            if(!video.endsWith('.mp4') && !video.endsWith('.mov') && !video.endsWith('.avi') && !video.endsWith('.wmv')) err.push("Please input a valid video link(.mp4/.mov/.avi/.wmv)")
        }
        if(msg){
            if(msg.length > 200) err.push("Message is too long")
        }
        setErrors(err)
        // console.log(errors)
    },[msg,img,video])

    const handleSubmit = async (e) => {
        // console.log('submit')
        e.preventDefault();
        if(errors.length > 0) {
            setDisplayErrors(true)
            return
        }
        if(errors.length === 0){
            const info = {post_msg:msg, post_img:img, post_video:video}
            dispatch(createPostThunk(info))
            setModalOpen(false)
            return
        }
        return
    }

    return(
        <div className="create_post_wrapper">
            <div className="create_post_wrapper2">
                <h2>Create Post</h2>
                <div className='thex' onClick={() => setModalOpen(false)}>x</div>
            </div>
            <div className="create_post_wrapper3">
                {user.profile_photo ?
                <img className='profile_pic3' src={user.profile_photo} alt='User Profile pic'></img>:
                <img className='profile_pic3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s' alt="default profile pic"></img>
                }
                <div className='name_creatpost'>{user.first_name}</div>
                <div className='name_creatpost'>{user.last_name}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea className='textarea1'
                    type="text" value={msg} placeholder="What's on your mind?" onChange={(e) => setMsg(e.target.value)}>
                    </textarea>

                </div>

                <div>
                    <label className="label123">Photo upload</label>
                    <input
                    className="input12"
                    type='text' value={img} onChange={(e) => setImg(e.target.value)}>
                    </input>
                </div>

                <div>
                    <label className="label123">Video upload</label>
                    <input
                    className="input12"
                    type='text' value={video} onChange={(e) => setVideo(e.target.value)}>
                    </input>
                </div>
                <div>
                    {displayErrors?
                        <div >
                            {errors?.map((error, idx) => (
                                <div className="error233" key={idx}>{error}</div>
                            ))}
                        </div>:null}
                </div>
                <div className="createpost_button">
                    <button className='post_submit'type='submit' >Post </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost
