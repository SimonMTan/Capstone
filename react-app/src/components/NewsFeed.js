import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getPostsThunk} from '../store/post'
import EditPostModal from "./Editpost";
import {deletePostThunk} from '../store/post'
import CreatePostModal from "./CreatePost";
import CreateComments from "./CreateComment/CreateComment";
import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";
import './NewsFeed.css'

function NewsFeed () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => state.post);
    const allposts = Object.values(posts)
    const flipPosts = []
    for(let i = allposts.length - 1; i >= 0; i--) {
        flipPosts.push(allposts[i])
    }
    // console.log(allposts, 'this is allposts')
    const comment = useSelector(state => state.comment);
    const[showoption2, setShowoption2] = useState(false)
    const[showEdit,setShowEdit] = useState(true)
    const[showOption,setShowOption] = useState(false)

    const editComment = () => {
        setShowEdit(false)
        setShowoption2(false)
    }
    // console.log(comment)
    useEffect(() => {
        dispatch(getPostsThunk());
        // setShowEdit(true)
    },[dispatch])

    const defaultpic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'

    return (
        <div className="newsfeed_wrapper">
            <div className="newfeed_info_wrapper">
                <div className="profile_pic_wrapper">
                    <img className='profile_pic' src={user.profile_photo?user.profile_photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'}></img>
                    <div className='create_post' ><CreatePostModal user={user} /></div>
                </div>
                {flipPosts?.map((post) => (

                        <div className='post_wrapper'key={post?.id}>
                            <div className='post_wrapper2'>
                                <div className="username_wrapper">
                                    <img className='profile_pic' src={post.user.profile_photo?post.user.profile_photo:defaultpic}></img>
                                    <div className="name">{post.user.first_name}</div>
                                    <div className="name">{post.user.last_name}</div>
                                </div>
                            <div>
                                {post.user.id === user.id ?
                                <div className='option' onClick={() => setShowOption(post.id)}>...</div>:null}
                                <div>
                                    {showOption === post.id?
                                        <div>
                                            {post.user.id === user.id ?
                                            <div>
                                                <div><EditPostModal post={post} id={post.id}/></div>
                                                <button onClick={()=>{dispatch(deletePostThunk(post.id)).then(()=>dispatch(getPostsThunk())) }}>DELETE</button>
                                            </div>
                                            : null}
                                        </div>
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div>{post.post_msg}</div>
                        {post.post_img ?<img width={'250px'} src={post.post_img}></img>: null}
                        {post.post_video ?
                        <video width='250px'controls>
                            <source src={post.post_video} type="video/mp4">
                            </source>
                        </video>: null
                        }
                        <div>like </div><div>comment</div>
                        <div>
                            {post.comments.map((com) => (
                                <div key={com.id}>
                                    {com.comment_user.profile_photo ?
                                        <img src={com.comment_user.profile_photo} ></img> :
                                        <img className='profile_pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'></img>
                                    }
                                    <div>{com.comment_user.first_name}</div>
                                    <div>{com.comment_user.last_name}</div>
                                    {showEdit ?
                                    <div>{com.comment}</div> :
                                    <EditComment comment={com.comment} id={com.id} showEdit={showEdit} setShowEdit={setShowEdit} />
                                    }
                                    {com.user_id === user.id ?
                                    <div onClick={()=>setShowoption2(com.id)} >...</div>
                                    :null}
                                    {showoption2 === com.id ?
                                    <div>
                                        <div onClick={editComment}>Edit</div>
                                        <DeleteComment id={com.id}/>
                                    </div>
                                    : null}
                                </div>
                                ))}
                            </div>
                            <div className="hello">
                                <CreateComments post={post} />
                            </div>
                        </div>

                ))}
            </div>
        </div>
    )}

export default NewsFeed;
