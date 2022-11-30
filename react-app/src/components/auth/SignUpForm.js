import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({setLogin}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='submit_wrapper'>
      <div className='splash-left'>
        {/* <img className='logo'src='https://images-platform.99static.com//v6Aa4Q2kYUFBXFyEv7emqhkowEY=/1145x129:1927x911/fit-in/500x500/99designs-contests-attachments/103/103854/attachment_103854253'></img> */}
        <h1 className='logoname'>Homielist</h1>
        <h3 className='connect_fri'>Connect with friends and the world around you on Homielist</h3>
      </div>
      <form className='signupform'onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='signupbox'>
          {/* <label>User Name</label> */}
          <input
            className='signupinput'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='Username'
          ></input>
        </div>
        <div className='signupbox'>
          {/* <label>Email</label> */}
          <input
            className='signupinput'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Email'
          ></input>
        </div>
        <div className='signupbox'>
          {/* <label>Password</label> */}
          <input
            className='signupinput'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Password'
          ></input>
        </div>
        <div className='signupbox'>
          {/* <label>Repeat Password</label> */}
          <input
            className='signupinput'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm password'
          ></input>
        </div>
        <div className='signup_button'>
          <button className='signup_button2'type='submit'>Sign Up</button>
        </div>
        <div>-----------------------------------------------</div>
        <div className='already_lable'>Already have an account?</div>
        <div className='Loginlink' onClick={()=>setLogin(true)}> ▶ Log in here! ◀ </div>
      </form>
    </div>
  );
};

export default SignUpForm;
