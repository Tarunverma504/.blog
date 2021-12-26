import './App.css';
import React from "react";
import Login from "./components/authenticate/login";
import Signup from './components/authenticate/signup';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import OTP from "./components/authenticate/otp";
import Forget from "./components/authenticate/Forgotform";
import Resetform from "./components/authenticate/resetform";
import Home from "./components/Home/Home"; 
import Userprofile from './components/profile/userprofile';
import Adminprofile from './components/profile/AdminProfile';
import Profilephoto from './components/profile/profilephoto';
import Coverphoto from './components/profile/coverphoto';
import Loader from './components/loader';
import Createpost from './components/posts/createpost';
import Viewpost from './components/posts/viewPost';
import Errorpage from './components/error';
import Filter from './components/posts/filter';
// import User from '../../server/model/user';
function App() {
  return (
    <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/category/:option' component={Filter}/>
            <Route exact path='/Author/:id' component={Userprofile}/>
            <Route exact path='/create/post' component={Createpost}/>
            <Route exact path='/view/blog/:id' component={Viewpost}/>
            <Route exact path='/update_profile_photo' component={Profilephoto}/>
            <Route exact path='/update_cover_photo' component={Coverphoto}/>
            <Route exact path='/admin' component={Adminprofile}/>
            <Route exact path='/:id/reset' component={Resetform}/>
            <Route exact path='/forgot' component={Forget}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/:id/verify' component={OTP}/>
            <Route exact path='/signup' component={Signup}/>
          </Switch>
    </BrowserRouter>
  );
}

export default App;

