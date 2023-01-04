import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import './User.css';
import CreatePostModal from "./CreatePost";
import { getPostsThunk } from '../store/post';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);
  const allposts = Object.values(posts)
  console.log(allposts,"allpostsbefore filtering");
  const filterposts = allposts.filter(post => post.user_id == userId)
  console.log(filterposts, '$$$$ filtered posts $$$$');
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
    // <ul>
    //   <li>
    //     <strong>User Id</strong> {userId}
    //   </li>
    //   <li>
    //     <strong>Username</strong> {user.username}
    //   </li>
    //   <li>
    //     <strong>Email</strong> {user.email}
    //   </li>
    // </ul>
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
            {filterposts?.map((postx) =>(<div className='posts' key={postx.id}> posts </div>))}

          </div>
        </div>
      </div>

    </>
  );
}
export default User;
