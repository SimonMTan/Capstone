import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({setLogin}) => {
  const [errors, setErrors] = useState();
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showErrors2,setShowErrors2] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  function isEmpty2(str) {
    return !str.trim().length
  }


  useEffect(async() => {
    const err = {};
    if(!firstname || isEmpty2(firstname)) err.firstname = '⛔Please provide a firstname';
    if(!lastname || isEmpty2(lastname)) err.lastname = '⛔Please provide a lastname';
    if(!username || isEmpty2(username)) err.username = '⛔Please provide a username';
    if(username.length > 15) err.username = '⛔Username must be less than 15 characters';
    if(username.length < 3) err.username = '⛔Username must be at least 3 characters';
    if(!email || isEmpty2(email)) err.email = '⛔Please provide an email';
    if(!email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) err.email='⛔Please provide a valid email';
    if(!password || isEmpty2(password)) err.password = '⛔Please provide a password';
    if(password.length < 6) err.password = '⛔Password must be at least 6 characters';
    if(password.length > 15) err.password = '⛔Password must be less than 15 characters';
    if(password !== repeatPassword) err.password2 = '⛔Passwords must match';
    setErrors(err)
  },[firstname,lastname,username,email,password,repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setShowErrors2(true)
    // console.log('this is working?',Object.values(errors).length <1)
    // console.log('where is the errors',errors)
    let arrerr = Object.values(errors)
    if (password === repeatPassword && arrerr.length <1) {
      console.log('this is working too?',username, email, password,firstname,lastname )
      const data = await dispatch(signUp(username, email, password,firstname,lastname));
      if (data) {
        console.log(data)
        const errs = {};
        for (let error of data){
          if(error.startsWith('username')) errs.username = '⛔Username already taken';
          if(error.startsWith('email')) errs.email = '⛔Email already in use';
        }
        setShowErrors2(true)
        setErrors(errs)
        return
      }
    }
    return
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
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
      <div className='signupbox'>
          <input
            className='signupinput'
            type='text'
            name='firstname'
            onChange={updateFirstname}
            value={firstname}
            placeholder='First Name'
          ></input>
        </div>
        {showErrors2 && errors.firstname && <div className='error'>{errors.firstname}</div>}
        <div className='signupbox'>
          <input
            className='signupinput'
            type='text'
            name='lastname'
            onChange={updateLastname}
            value={lastname}
            placeholder='Last Name'
          ></input>
        </div>
        {showErrors2 && errors.lastname && <div className='error'>{errors.lastname}</div>}
        <div className='signupbox'>
          <input
            className='signupinput'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='Username'
          ></input>
        </div>
        {showErrors2 && errors.username && <div className='error'>{errors.username}</div>}
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
        {showErrors2 && errors.email && <div className='error'>{errors.email}</div>}
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
        {showErrors2 && errors.password && <div className='error'>{errors.password}</div>}
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
        {showErrors2 && errors.password2 && <div className='error'>{errors.password2}</div>}
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
