import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getPostsThunk} from '../store/post'
import EditPostModal from "./Editpost";
// import {deletePostThunk} from '../store/post'
import CreatePostModal from "./CreatePost";
import CreateComments from "./CreateComment/CreateComment";
import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";
import Likeaction from "./Like/like"
import './NewsFeed.css'
import Deletepost from "./Deletepost/Deletepost";
import likeicon from './Logo/like.png'

function NewsFeed () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => state.post);
    const allposts = Object.values(posts)
    let flipPosts = []
    for(let i = allposts.length - 1; i >= 0; i--) {
        flipPosts.push(allposts[i])
    }
    console.log(allposts, 'this is allposts')
    // const comment = useSelector(state => state.comment);
    const[showoption2, setShowoption2] = useState(false)
    const[showEdit,setShowEdit] = useState(true)
    const[showOption,setShowOption] = useState(false)
    const [showComment,setShowComment] = useState(false)
    // const [setId,setSetId] = useState()
    // const [isloaded,setIsLoaded] = useState(false)

    // const editComment = () => {
    //     setShowEdit(false)
    //     setShowoption2(false)
    // }

    // console.log(comment)

    // useEffect(() => {
        //     if (!showOption) return;
        //     // if(!showoption2) return;

        //     const closeMenu = () => {
    //         setShowOption(false)
    //         // setShowoption2(false)
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    //     }, [showOption]);

    // useEffect(() => {
    //     // if (!showOption) return;
    //     if(!showoption2) return;

    //     const closeMenu2 = () => {
    //         // setShowOption(false)
    //         setShowoption2(false)
    //     };

    //     document.addEventListener('click', closeMenu2);

    //     return () => document.removeEventListener("click", closeMenu2);
    //     }, [showoption2]);

    // const handleDelete = async(id) => {
    //     await dispatch(deletePostThunk(id))
    //     await dispatch(getPostsThunk())
    // }

    useEffect(() => {
        dispatch(getPostsThunk());
        // setShowEdit(true)
    },[dispatch])

    const defaultpic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'
    const defaultimg =  'https://bemyeyes-assets.s3.amazonaws.com/podcasts/smm/podcast-cover-Cats.jpg'
    const defaultvideo = 'https://i.imgur.com/eWrYBlL.mp4'
    return (
        <div className="newsfeed_wrapper">
            <div className="newfeed_info_wrapper">
                <div className="profile_pic_wrapper">
                    <img className='profile_pic' src={user.profile_photo?user.profile_photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'} alt=''></img>
                    <div className='create_post' ><CreatePostModal user={user} /></div>
                </div>
                {flipPosts?.map((post) => (
                        <div className='post_wrapper'key={post?.id}>
                            <div className='post_wrapper2'>
                                <div className="username_wrapper">
                                    <img className='profile_pic' alt='' src={post.user.profile_photo?post.user.profile_photo:defaultpic}></img>
                                    <div className="name">{post.user.first_name}</div>
                                    <div className="name">{post.user.last_name}</div>
                                </div>
                            <div className='option'>
                                {post.user.id === user.id ?
                                <div className="threedotsoptions"  onClick={() => setShowOption(post.id)}>...</div>:null}
                                <div>
                                    {showOption === post.id?
                                        <div>
                                            <div className="option2">
                                                <div className='option3'><EditPostModal post={post} id={post.id} setShowOption={setShowOption}/></div>
                                                <div className='option3'><Deletepost id={post.id} setShowOption={setShowOption}/></div>
                                            </div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div className="msg">{post.post_msg}</div>
                        {post.post_img ?<img alt='' width={'680'} height='600px' src={post.post_img} onError={(e) => e.target.src = defaultimg}></img>: null}
                        {post.post_video ?
                        <video key={post.post_video} width='680px' height='600px' controls src={post.post_video} onError={(e) => e.target.src = defaultvideo} type="video/mp4">
                            {/* <source >
                            </source> */}
                        </video>: null
                        }
                        <div className="likeandcomment">
                            {post.likes.length?
                            <div className="like_container">
                                <img alt='likeicon' className='likeicon' src={likeicon} width='20px' height='20px'></img>
                                {post.likes.length === 1 ?
                                <div>{post.likes[0].like_user.first_name}{' '}{post.likes[0].like_user.last_name}</div> :
                                <div>{post.likes.length}</div>}
                            </div>
                            :<div></div>}
                            {post.comments.length?
                            <div>
                                {post.comments.length} {post.comments.length<2?'comment':'comments'}
                            </div>
                            :null}
                        </div>
                        <div className="likeorcomment">
                            {(post.likes.filter(like => like.user_id === user.id).length !== 0)?
                            <div className={"liked"}> <Likeaction id={post.id}like={true}/></div>:
                            <div className={"like"}> <Likeaction id={post.id}like={false}/></div>}
                            {/* need to wrap line 134 with terinary rather than just classname*/}
                            <div className="like" onClick={() => setShowComment(post.id)}><i class="fa-regular fa-comment"></i>&nbsp;Comment</div>
                        </div>
                        <div className="comment_wrapper">
                            {post.comments.map((com) => (
                            <div >
                                {showComment === post.id ?
                                    <div key={com.id}>
                                        <div className='username_wrapper'>
                                            {com.comment_user.profile_photo ?
                                                <img className='profile_pic' src={com.comment_user.profile_photo} alt=''></img> :
                                                <img className='profile_pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'alt='default'></img>
                                            }
                                            <div className="xxx">
                                                {showEdit === com.id ?
                                                <EditComment comment={com.comment} id={com.id} showEdit={showEdit} setShowEdit={setShowEdit} />:
                                                <div>
                                                    <div className='username_wrapper2'>
                                                        <div className='name2'>{com.comment_user.first_name}</div>
                                                        <div className='name2'>{com.comment_user.last_name}</div>
                                                    </div>
                                                    <div className="name3">{com.comment}</div>
                                                </div>
                                                }
                                            </div>
                                            {com.user_id === user.id ?
                                                <div className="threedots" onClick={()=>setShowoption2(com.id)} >...</div>
                                                :null}

                                                {showoption2 === com.id ?
                                                <div className='comment_option_drop'>
                                                    <div className='comment_option'onClick={()=>{setShowEdit(com.id);setShowoption2(false)}}>Edit</div>
                                                    <div className='comment_option'><DeleteComment id={com.id} setShowoption2={setShowoption2}/></div>
                                                </div>
                                                : null}

                                        </div>
                                    </div>
                                :null}
                            </div>
                                ))}
                            <div className="create_Comment_wrapper">
                                <img className='profile_pic' src={user.profile_photo?user.profile_photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'} alt=''></img>
                                <div className="hello">
                                    <CreateComments post={post} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

export default NewsFeed;
