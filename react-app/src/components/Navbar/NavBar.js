import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
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
            Logo
          </NavLink>
          {/* <div>searchbar</div>  <<< uncomment this later*/}
        </div>

        <div className='navbar_mid'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
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
          {/* <div className='narbar_right_2'> */}
          {showMenu && (
            <LogoutButton />
            )}
            </div>
        {/* </div> */}
      </div>
    // </nav>
  );
}

export default NavBar;