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
          <NavLink className='Logo' to='/' exact={true} >
            <img id="icon" src={HomieLogo} alt="Logo"></img>
          </NavLink>
          <label className='searchbar' >
            <i class="fa-solid fa-magnifying-glass"></i>
            <input placeholder='Search Homielist...' type='search'></input>
          </label>
        </div>

        <div className='navbar_mid'>
          {/* <div > */}
            <NavLink className='navbar_mid_left active2' to='/' exact={true} activeClassName='active'>
              <img id="icon2" src={Home} alt="homeLogo"></img>
            </NavLink>
          {/* </div> */}
          {/* <div> */}
            <NavLink className='navbar_mid_left' to={`/users/${user?.id}`} exact={true} activeClassName='active'>
            <i id="icon2" src={Home} alt="profileLogo" class="fa-regular fa-user"></i>
            </NavLink>
          {/* </div> */}
        </div>
        <div className='nav-wrapper98'>
          <div className='nav-wrapper99'>
              <div className="dev-socials-links00">
                  <p className="dev-socials-links99">
                  <a href="https://github.com/SimonMTan" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i></a>
                  </p>
              </div>
              <div>
                  <p className="dev-socials-links99">
                  <a href="https://www.linkedin.com/in/simonmtan/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-linkedin"></i>
                  </a>
                  </p>
              </div>
              <div>
                  <p className="dev-socials-links99">
                  <a href="https://github.com/SimonMTan/Capstone" target="_blank" rel="noreferrer">
                      <i class="fa-solid fa-folder"></i>
                  </a>
                  </p>
              </div>
            </div>
            <div className='navbar_right'>
              <img className='profile_pic99' onClick={openMenu} src={user?.profile_photo?user?.profile_photo:defaultpic} ></img>

              {showMenu && (
                <LogoutButton />
                )}

            </div>
          </div>
      </div>
    // </nav>
  );
}

export default NavBar;
