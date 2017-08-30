import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import LoginContainer from '../../Pages/Login/container';
import Logout from '../Logout';
import SignupContainer from '../../Pages/Signup/container';
import JournalistTable from '../../Pages/JournalistTable';
import IssueTable from '../../Pages/IssueTable';
import ArticleTableContainer from '../../Pages/ArticleTable/container';
import Publish from '../../Pages/Publish';
import ProfileContainer from '../../Pages/Profile/container';
import MainPageContainer from '../../Pages/MainPage/container';
import MissionContainer from '../../Pages/Mission/container';
import StoryContainer from '../../Pages/Story/container';
import ForgotPasswordContainer from '../../Pages/ForgotPassword/container';
import TwoFactor from '../../Pages/TwoFactor';
import SelectTagPreview from '../TagSelect/SelectTagPreview';

import { getJWT } from '../jwt';

import './index.css';

export default function Router() {

    const jwt = getJWT();

    return (
        <div>
            <nav>

                <ul key={jwt.id}>
                    {/*for responsiveness */}
                    <label htmlFor='menuToggle'>
                    <span className="container" />
                        <li className='showMenu hidden'> ||| </li>
                    </label>
                    <input id='menuToggle' tabIndex={-1} type='checkbox' />

                    <li><Link to="/">Home</Link></li>
                    <li><SelectTagPreview /></li>
                    {jwt.level ? "" : <li><Link to="/login">Login</Link></li>}
                    <li><Link to="/signup">Create Account</Link></li>
                    <li><Link to="/u">Journalists</Link></li>
                    <li><Link to="/mission">Mission</Link></li>
                    <li><Link to="/issue">Issues</Link></li>
                    {jwt.level ? <li><Link to="/modifyArticles">Articles</Link></li> : ""}
                    {jwt.level ? <li><Link to="/publish">Publish</Link></li> : ""}
                    {jwt.level ? <li id="logout"><Logout /></li>
                                : ""}
                    {jwt.level ? <li className="profile"><Link to={`/u/${jwt.profileLink}`}>Profile</Link></li> : ""}
                </ul>
            </nav>
            <Switch>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/signup" component={SignupContainer}/>
                <Route exact path="/u" component={JournalistTable}/>
                <Route path="/mission" component={MissionContainer}/>
                <Route exact path="/issue" component={IssueTable}/>
                {jwt.level ? <Route path="/modifyArticles" component={ArticleTableContainer}/> : ""}
                {jwt.level ?  <Route path="/publish" component={Publish} /> : ""}
                <Route path="/issue/(.*)/story/(.*)" component={StoryContainer}/>
                <Route path="/tag/(.*)" component={MainPageContainer}/>
                <Route path="/issue/(.*)" component={MainPageContainer}/>
                <Route exact path="/" component={MainPageContainer}/>
                <Route path="/u/(.*)" component={ProfileContainer}/>
                <Route path="/authLogin" component={TwoFactor}/>
                <Route path="/forgotPass" component={ForgotPasswordContainer}/>

            </Switch>
        </div>
        );
}