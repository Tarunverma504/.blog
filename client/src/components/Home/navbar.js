import React ,{useState,useEffect} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import "../../style/navbar.css";
import image1 from "../../assests/user.png";

import Usercontrols from "./Usercontrol";
function Navbar(){
    const [user,setUser]=useState({
        "user_id":"",
        "username":"",
        "profile__photo":"",
        "cover__photo":""
    });
    console.log(Object.keys(user).length === 0);
    useEffect(()=>{
        const r=sessionStorage.getItem("UserData");
        if(r==null){
          console.log("empty");
          setUser({});
        }
        else{
          console.log("data");
          const temp=JSON.parse(r);
          console.log(user.username);
          const dummy={
            "user_id":temp.user_id,
            "username":temp.username,
            "profile__photo":temp.profile__photo,
            "cover__photo":temp.cover__photo,
          }
          setUser(dummy);
        
        }
      },[])

    return(
        <>
            <nav>
                <div className="innerdiv1">
                    <Link to="/" id="title" className="logo">.blog</Link>
                </div>
                <div className="innerdiv2">
                    {Object.keys(user).length === 0?<Link to="/login" id="title" style={{fontSize:"2rem"}}className="logo">Login</Link>:<Usercontrols username={user.username} image={user.profile__photo}/>}
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar;