import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getPostsThunk} from '../store/post'
import EditPostModal from "./Editpost";
import {deletePostThunk} from '../store/post'
import CreatePostModal from "./CreatePost";
import CreateComments from "./CreateComment/CreateComment";
import DeleteComment from "./DeleteComment/DeleteComment";
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
    const[showoption, setShowoption] = useState(false)

    // console.log(comment)
    useEffect(() => {
        dispatch(getPostsThunk());
    },[dispatch])


    return (
        <div className="newsfeed_wrapper">
            <div>
                <div>
                    <CreatePostModal user={user} />
                </div>
                {flipPosts.map((post) => (
                    <div key={post.id}>
                        {post.user.id === user.id ?
                        <div>
                            <div><EditPostModal post={post} id={post.id} /></div>
                            <button onClick={()=>{dispatch(deletePostThunk(post.id)).then(()=>dispatch(getPostsThunk())) }}>DELETE</button>
                        </div>: null}
                        <div>
                            <div>{post.user.first_name}</div>
                            <div>{post.user.last_name}</div>
                        </div>
                        <div>{post.post_msg}</div>
                        <img src={post.post_img}></img>
                        {post.post_video ?
                        <video controls>
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
                                    <div>{com.comment}</div>
                                    {com.user_id === user.id ?
                                    <div onClick={()=>setShowoption(!showoption)} >...</div>
                                    :null}
                                    {showoption ?
                                    <div>
                                        <div>edit comment form</div>
                                        <DeleteComment id={com.id}/>
                                    </div>
                                     : null}
                                </div>
                            ))
                            }
                        </div>
                        <div>
                            <CreateComments post={post} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

export default NewsFeed;
