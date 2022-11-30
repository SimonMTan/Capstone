import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Redirect, useHistory } from 'react-router-dom';
import './LogoutButton.css'

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  // const user = useSelector(state => state.session.user);
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')

  };

  return <div className='navbar_right_2'onClick={onLogout}>Log Out</div>;
};

export default LogoutButton;
