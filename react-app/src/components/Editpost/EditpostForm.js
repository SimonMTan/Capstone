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
    const [errors , setErrors] = useState([])
    const [displayErrors , setDisplayErrors] = useState(false)


    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const err = []
        if(!msg && !img && !video) err.push("Please input something to post")
        if(!img.endsWith('.jpg') && !img.endsWith('.png') && !img.endsWith('.jpeg') && !img.endsWith('.gif')) err.push("Please input a valid image link")
        if(!video.endsWith('.mp4') && !video.endsWith('.mov') && !video.endsWith('.avi') && !video.endsWith('.wmv')) err.push("Please input a valid video link")
        if(msg.length > 200) err.push("Message is too long")
        setErrors(err)
        console.log(errors)
        console.log(!img.endsWith('.png') && !img.endsWith('.jpeg') , 'checkingerror')
    },[msg,img,video])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(errors.length > 0) {
            setDisplayErrors(true)
            return
        }
        const info = {post_msg:msg, post_img:img, post_video:video}
        await dispatch(editPostThunk(info,id))
        setModalOpen(false)
        setShowOption(false)
    }


    // })

    if(!user)
        return <Redirect to='/'/>

    return (
        <div className="editpostform_wrapper">
            <h1 className='editpost'>Edit post</h1>
            <div className="editpost_wrapper2">
                {user.profile_photo ?
                <img className='profile_pic3' src={user.profile_photo}></img>:
                <img className='profile_pic3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'></img>
                }
                <div className="name99">{user.first_name}</div>
                <div className="name99">{user.last_name}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea className='textarea99'
                    type="text" value={msg} onChange={(e) => setMsg(e.target.value)}>
                    </textarea>
                    {/* <label>Message Link</label> */}
                </div>
                {/* {img ? */}
                    <div>
                        <label className="label99">Upload Image</label>
                        <input
                        className="input99"
                        type='text' value={img} onChange={(e) => setImg(e.target.value)}>
                        </input>
                    </div>
                {/* : null} */}
                {/* {video ? */}
                    <div>
                        <label className="label99">Upload video</label>
                        <input
                        className="input99"
                        type='text' value={video} onChange={(e) => setVideo(e.target.value)}>
                        </input>
                    </div>
                {/* : null} */}
                <div>
                    {displayErrors?
                        <div >
                            {errors?.map((error, idx) => (
                                <div className="error233" key={idx}>{error}</div>
                            ))}
                        </div>:null}
                </div>
                <div className="editpost_botton">
                    <button className='post_submit99' type='submit'>Edit Post</button>
                    <button className='post_submit99' onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )

}


export default Editpost
