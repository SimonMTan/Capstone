import { useSelector, useDispatch } from "react-redux";
import { presslike } from "../../store/like";
import { getPostsThunk } from "../../store/post";

export default like = ({id}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    

    const handleclick = async() => {
        await dispatch(presslike(id)).then(dispatch(getPostsThunk()))
        // await dispatch(presslike(id))
        // await dispatch(getPostsThunk())

    }

    return (
        <div>
            <div onClick={handleclick} className="like">like </div>
        </div>
    )
}
