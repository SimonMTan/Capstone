import { useSelector} from 'react-redux';
import NewsFeed from '../NewsFeed';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import NavBar from '../Navbar/NavBar';
import { useState } from 'react';
import './home.css'
const Homepage = () => {
    const user = useSelector(state => state.session.user);
    const [login, setLogin] = useState(true);

    return(
        <div>
        {user ?
            <div>
                <NavBar />
                <NewsFeed />
            </div> :
            <div>
                {login ?
                <LoginForm setLogin={setLogin} /> :
                <SignUpForm setLogin={setLogin} />
                }
                <div className='footer-wrapper'>
                    <div className="dev-socials-links">
                        <p className="dev-socials-links2">
                        <a href="https://github.com/SimonMTan" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github"></i></a>
                        </p>
                    </div>
                    <div>
                        <p className="dev-socials-links2">
                        <a href="https://www.linkedin.com/in/simonmtan/" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        </p>
                    </div>
                    <div>
                        <p className="dev-socials-links2">
                        <a href="https://github.com/SimonMTan/Capstone" target="_blank" rel="noreferrer">
                            <i class="fa-solid fa-folder"></i>
                        </a>
                        </p>
                    </div>
                  </div>
            </div>
            }
        </div>
    )
}

export default Homepage;
