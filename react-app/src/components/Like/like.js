import { useSelector, useDispatch } from "react-redux";
import { presslike } from "../../store/like";
import { getPostsThunk } from "../../store/post";
import './Like.css'

export default function Likeaction ({id,like}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);


    const handleclick = async() => {
        await dispatch(presslike(id)).then(dispatch(getPostsThunk()))
    }

    return (
        // <div>
            <div className="clickareamain" onClick={handleclick} >
                {like?
                <div className="clickarea"><i class="fa-solid fa-thumbs-up"></i>&nbsp;like</div>:
                <div className="clickarea"><i class="fa-regular fa-thumbs-up"></i>&nbsp;like</div>}
            </div>
        // </div>
    )
}
