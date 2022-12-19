import { useSelector, useDispatch } from "react-redux";
import { presslike } from "../../store/like";
import { getPostsThunk } from "../../store/post";

export default function Likeaction ({id,like}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);


    const handleclick = async() => {
        await dispatch(presslike(id)).then(dispatch(getPostsThunk()))
        // await dispatch(presslike(id))
        // await dispatch(getPostsThunk())

    }

    return (
        <div>
            <div onClick={handleclick} >
                {like?
                <div><i class="fa-solid fa-thumbs-up"></i>&nbsp;like</div>:
                <div><i class="fa-regular fa-thumbs-up"></i>&nbsp;like</div>}
            </div>
        </div>
    )
}
