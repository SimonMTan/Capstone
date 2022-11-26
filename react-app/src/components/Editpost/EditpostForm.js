import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editPostThunk } from "../../store/post"

function Editpost ({id,post,setModalOpen}) {
    const dispatch = useDispatch()
    console.log(post, 'this is post from editpost')
    const [msg , setMsg] = useState(post.post_msg)
    const [img , setImg] = useState(post.post_img)
    const [video , setVideo] = useState(post.post_video)
    // const [showModal, setShowModal] = useState(setShowModal);
    const [validationErrors, setValidationErrors] = useState([]);


    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalOpen(false)
        const info = {msg:msg, img:img, video:video}
        dispatch(editPostThunk(info,id))
    }

    // useEffect(() => {

    // })

    if(!user)
        return <Redirect to='/'/>

    return (
        <div>
            <h1>hello</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                    typeof="text" value={msg} onChange={(e) => setMsg(e.target.value)}>
                    </textarea>
                    <label>Message Link</label>
                </div>
                {img ?
                    <div>
                        <input
                        type='file' value={img} onChange={(e) => setImg(e.target.value)}>
                        </input>
                        <label>Image Link</label>
                    </div>
                : null}
                {video ?
                    <div>
                        <input
                        type='file' value={video} onChange={(e) => setVideo(e.target.value)}>
                        </input>
                        <label>Video Link</label>
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
