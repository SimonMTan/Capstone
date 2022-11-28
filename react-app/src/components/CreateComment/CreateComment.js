import { useState ,useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'

export default function CreateComments(){
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    return (
        <div>
            <form>
                <div>
                    <input type='text' placeholder='Write a comment...' value={comment} onChange={(e) => setComment(e.target.value)}>
                    </input>
                </div>
            </form>
        </div>
    )
}
