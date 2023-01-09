import { useDispatch } from "react-redux";
import { presslike } from "../../store/like";
import { getPostsThunk } from "../../store/post";
import './Like.css'

export default function Likeaction ({id,like}) {

    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    console.log(id,'this is id from like')


    const handleclick = async() => {
        await dispatch(presslike(id)).then(dispatch(getPostsThunk()))
    }

    return (

            // <div className="clickareamain" onClick={handleclick} >
            //     {like?
            //     <div>
            //     <input type="checkbox" id="hacky-input" />
            //     <label for="hacky-input">
            //     <i className="fa-solid fa-thumbs-up"></i>
            //     &nbsp;like
            //     </label>
            //     </div>:
            //     <div>
            //     <input type="checkbox" id="hacky-input" />
            //     <label for="hacky-input">
            //     <i className="fa-regular fa-thumbs-up"></i>
            //     &nbsp;like
            //     </label>
            //     </div>}
            // </div>

            <div className="clickareamain" onClick={handleclick} >
                {like?
                <div className="clickarea"><i className='thumbicon' class="fa-solid fa-thumbs-up"></i>&nbsp;like</div>:
                <div className="clickarea"><i className='thumbicon' class="fa-regular fa-thumbs-up"></i>&nbsp;like</div>}
            </div>

        )
    }

        // <input type="checkbox" id="hacky-input" />
        // <label for="hacky-input">
        // <div className="crossRotate">SHIBA</div>
        // </label>
