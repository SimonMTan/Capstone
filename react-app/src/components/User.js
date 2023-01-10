import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import './User.css';
import CreatePostModal from "./CreatePost";
import { getPostsThunk } from '../store/post';
import EditPostModal from "./Editpost";
import Deletepost from "./Deletepost/Deletepost";
import Likeaction from "./Like/like"
import CreateComments from "./CreateComment/CreateComment";
import DeleteComment from "./DeleteComment/DeleteComment";
import EditComment from "./EditComment/EditComment";

import likeicon from './Logo/like.png'


function User() {
  const [user, setUser] = useState({});
  const [showoption2, setShowoption2] = useState(false)
  const [showEdit,setShowEdit] = useState(true)
  const [showOption,setShowOption] = useState(false)
  const [showComment,setShowComment] = useState(false)
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const posts = useSelector(state => state.post);
  const loginuser = useSelector(state => state.session.user);

  console.log(loginuser, 'this is loginuser')
  const allposts = Object.values(posts)
  console.log(allposts,"allpostsbefore filtering");
  const filterposts = allposts.filter(post => post.user_id == userId)
  console.log(filterposts, '$$$$ filtered posts $$$$');

  const defaultpic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'
  const defaultimg =  'https://bemyeyes-assets.s3.amazonaws.com/podcasts/smm/podcast-cover-Cats.jpg'
  const defaultvideo = 'https://i.imgur.com/eWrYBlL.mp4'

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      await dispatch(getPostsThunk());
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      console.log(user,'this is user from user page')
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }



  return (
    <>
      <NavBar />
      <div className='profilepage_wrapper'>
        <div className='userPage'>
          {user.cover_photo ?
          <img className='cover_photo' src='https://imgur.com/ukzX2Tf.png' alt=''/> :
          <div className='cover_photo'></div>}
        </div>
        <div className='profilepic_name'>
          {user.profile_photo?
          <img className='profile_pic2' src={user.profile_photo} alt="profile pic" /> :
          <img className='profile_pic2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s' alt="profile pic" />
          }
          <div className='user_fullname'>{user.first_name} {user.last_name}</div>
        </div>
        <div className='justline'></div>
        <div className='profilebody'>
          <div className='bioinfo'>
            <div className='introtitle'>Intro</div>
            <div className='introtext'>{user.bio ? user.bio: 'Bio information'}</div>
          </div>
          <div>
            <div className="profile_pic_wrapper_profile">
              <img className='profile_pic_profile' src={user.profile_photo?user.profile_photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'} alt=''></img>
              <div className='create_post_profile' ><CreatePostModal user={user} /></div>
            </div>
            {filterposts?.map((post) =>(<div className='posts' key={post.id}> <div className='post_wrapper2'>
                      <div className="username_wrapper">
                          <img className='profile_pic' alt='' src={post.user.profile_photo?post.user.profile_photo:defaultpic}></img>
                          <div className="name">{post.user.first_name}</div>
                          <div className="name">{post.user.last_name}</div>
                      </div>
                  <div className='option'>
                      {post.user.id === loginuser.id ?
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
              {post.post_img ?<img className='pic_container' alt='' width={'740'} height='600px' src={post.post_img} onError={(e) => e.target.src = defaultimg}></img>: null}
              {post.post_video ?
              <video className='videocontainer' key={post.post_video} width='700px' height='600px' controls src={post.post_video} onError={(e) => e.target.src = defaultvideo} type="video/mp4" >
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
                  {(post.likes.filter(like => like.user_id === loginuser.id).length !== 0)?
                  <div className={"liked"}> <Likeaction id={post.id} like={true}/></div>:
                  <div className={"like"}> <Likeaction id={post.id} like={false}/></div>}
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
                                  {com.user_id === loginuser.id ?
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
              </div> </div>))}
          </div>
        </div>
      </div>

    </>
  );
}
export default User;
