import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Redirect, useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  // const user = useSelector(state => state.session.user);
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')

  };

  return <button onClick={onLogout}>Log out</button>;
};

export default LogoutButton;
