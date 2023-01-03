import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import './User.css';
function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
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
      <div>
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
        <div>
          <div>Intro</div>
          <div>{user.bio ? user.bio: 'Bio information'}</div>
        </div>
      </div>

    </>
  );
}
export default User;
