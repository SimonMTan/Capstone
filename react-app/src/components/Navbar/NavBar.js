import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import HomieLogo from '../Logo/logo.png'
import Home from '../Logo/home1.png'
import './Navbar.css';
const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  // if(!user){
  //   return null;
  // }

  const openMenu = () => {
    if(showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
        setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

  const defaultpic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQnINoRpzBMeS82Re1CjVCAQS12Zx-EaWZYz5ZYg&s'
  return (
    // <nav>
      <div className='navbar_wrapper'>
        <div className='navbar_left'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img id="icon" src={HomieLogo} alt="Logo"></img>
          </NavLink>
          {/* <div>searchbar</div>  <<< uncomment this later*/}
        </div>

        <div className='navbar_mid'>
          <div className='navbar_mid_left'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img id="icon" src={Home} alt="Logo"></img>
            </NavLink>
          </div>
          {/* <div>
            <NavLink to={`/users/${user?.id}`} exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>    <<<< uncomment this later*/}
        </div>
        <div className='navbar_right'>
          <img className='profile_pic99' onClick={openMenu} src={user?.profile_photo?user?.profile_photo:defaultpic} ></img>

          {showMenu && (
            <LogoutButton />
            )}

        </div>
      </div>
    // </nav>
  );
}

export default NavBar;
