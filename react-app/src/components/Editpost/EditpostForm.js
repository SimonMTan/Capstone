import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editPostThunk } from "../../store/post"

const Editpost = () => {


const [msg , setMsg] = useState('')
const [img , setImg] = useState('')
const [video , setVideo] = useState('')
const [validationErrors, setValidationErrors] = useState([]);


const user = useSelector(state => state.session.user);
const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(editPostThunk({msg, img, video}))
}

useEffect(() => {

})

if(!user)
    return <Redirect to='/'/>

return (
    <div>
        <form onSubmit={handleSubmit}>
            <textarea
            typeof="text" value={msg} onChange={(e) => setMsg(e.target.value)}>
            </textarea>
            {img ?
                <div>
                    <input
                    type='file' value={img} onChange={(e) => setImg(e.target.value)}>
                    </input>
                </div>
            : null}
            {video ?
                <div>
                    <input
                    type='file' value={video} onChange={(e) => setVideo(e.target.value)}>
                    </input>
                </div>
            : null}
        </form>
    </div>
)

}


export default Editpost
