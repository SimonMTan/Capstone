import { useSelector} from 'react-redux';
import NewsFeed from '../NewsFeed';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import NavBar from '../Navbar/NavBar';
import { useState } from 'react';

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
            </div>}
        </div>
    )
}

export default Homepage;
