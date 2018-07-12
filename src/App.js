import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import Logout from './components/Auth/Logout';
import HomePage from './components/HomePage/HomePage';
import DiscoverPage from './components/DiscoverPage/DiscoverPage';
import FollowUser from './components/UserFeed/FollowUser';
import UnfollowUser from './components/UserFeed/UnfollowUser';
import PersonalFeed from './components/UserFeed/PersonalFeed';
import OtherUserFeed from './components/UserFeed/OtherUserFeed';
import DeleteChirp from './components/common/DeleteChirp';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteUser from './components/common/DeleteUser';

class App extends Component {
    render() {
        return (
            <div id="main">                
                <Header />

                <Switch>
                    <Route exact path="/" component={WelcomePage} />
                    <Route path="/index.html" component={WelcomePage} />
                    
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/logout" component={Logout} />

                    <Route exact path="/feed" component={HomePage} />
                    <Route path="/discover" component={DiscoverPage} />

                    <Route exact path="/profile" component={PersonalFeed} />
                    <Route path="/feed/:username" component={OtherUserFeed} />

                    <Route path="/follow/:username" component={FollowUser} />
                    <Route path="/unfollow/:username" component={UnfollowUser} />

                    <Route path="/deleteChirp/:id" component={DeleteChirp} />
                    <Route path="/deleteUser/:id" component={DeleteUser} />
                </Switch>

                <ToastContainer autoClose={2500}/>

                <Footer />
            </div>
        )
    }
}

export default withRouter(App)