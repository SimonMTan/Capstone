import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch ,  } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'


const LoginForm = ({setLogin}) => {
  const [errors, setErrors] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors,setShowErrors] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();

  function isEmpty2(str) {
    return !str.trim().length
  }

  useEffect(async() => {
    const err = {};
    if(!email || isEmpty2(email)) err.email = '⛔Please provide an email';
    if(!email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) err.email='⛔Please provide a valid email';
    if(!password || isEmpty2(password)) err.password = '⛔Please provide a password';
    setErrors(err)
  },[email,password])

  const onLogin = async (e) => {
    e.preventDefault();
    setShowErrors(true)
    let arrerr = Object.values(errors)
    if (arrerr.length <1) {
    const data = await dispatch(login(email, password));
      if (data) {
        // console.log(data,'this is data from login')
        const errs = {};
        for (let error of data){
          if(error.startsWith('email')) errs.email = '⛔Email not found';
          if(error.startsWith('password')) errs.password = '⛔Incorrect password';
        }
        setShowErrors(true)
        setErrors(errs)
        return
      }
    }
    return
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/help' />;
  }

  return (
    <div className='submit_wrapper'>
      <div className='splash-left'>
        {/* <img className='logo'src='https://images-platform.99static.com//v6Aa4Q2kYUFBXFyEv7emqhkowEY=/1145x129:1927x911/fit-in/500x500/99designs-contests-attachments/103/103854/attachment_103854253'></img> */}
        <h1 className='logoname'>Homielist</h1>
        <h3 className='connect_fri'>Connect with friends and the world around you on Homielist</h3>
      </div>
      <form className='loginform'onSubmit={onLogin}>
        <div className='loginbox1'>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            className='logininput'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        {showErrors && errors.email && (<div className='error'> {errors.email}</div>)}
        <div className='loginbox2'>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            className='logininput'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        {showErrors && errors.password && (<div className='error'>{errors.password}</div>)}
        <div className='submit_button21'>
          <button className='submit_button22' type='submit'>Log In</button>
        </div>
        <div className='demouser123'>
          <button className='demouser1234'
            type='submit' onClick={()=>{
            setEmail('demo@aa.io')
            setPassword('password')
            }}>
              Demo users?
          </button>
        </div>
        <div>-----------------------------------------------</div>
        <button className='newuser123' onClick={()=>setLogin(false)}>Create new account</button>
      </form>
    </div>
  );
};

export default LoginForm;
