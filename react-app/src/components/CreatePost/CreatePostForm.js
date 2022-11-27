import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


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
    }

    return(
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                    type="text" value={msg} onChange={(e) => setMsg(e.target.value)}>
                    </textarea>
                    <label>Message Link</label>
                </div>

                <div>
                    <input
                    type='text' value={img} onChange={(e) => setImg(e.target.value)}>
                    </input>
                    <label>Image Link</label>
                </div>


                <div>
                    <input
                    type='text' value={video} onChange={(e) => setVideo(e.target.value)}>
                    </input>
                    <label>Video Link</label>
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
