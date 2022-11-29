import { useSelector} from 'react-redux';
import NewsFeed from '../NewsFeed';
import LoginForm from '../auth/LoginForm';
import NavBar from '../Navbar/NavBar';

const Homepage = () => {
    const user = useSelector(state => state.session.user);


    return(
        <div>
        {user ?
            <div>
                <NavBar />
                <NewsFeed />
            </div> :
            <div>
                <LoginForm />
            </div>}
        </div>
    )
}

export default Homepage;
