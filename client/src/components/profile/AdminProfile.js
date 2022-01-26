import Navbar from "../Home/navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import "../../style/userProfile.css";
import { Link, useParams } from 'react-router-dom';
import Loader from "../loader";
import Posts from "../posts/posts";
import "../../style/posts.css";
import {Serverport} from "../../server_url";

// const Serverport="https://dot-blog.herokuapp.com";

function Adminprofile({history}){
    const [Admin,setAdmin]=useState({});
    const [loading, setLoading]=useState(false);
    const params = useParams();
    const [data,setData]=useState([]);

    useEffect( async()=>{
        const r=sessionStorage.getItem("UserData");
        if(r==null){
          console.log("empty");
          setAdmin({});
          history.push("/login");
        }
        else{
          // console.log("data");
          const temp=JSON.parse(r);
        //   console.log(user.username);
          const dummy={
            "user_id":temp.user_id,
            "username":temp.username,
            "profile__photo":temp.profile__photo,
            "cover__photo":temp.cover__photo,
          }
          setAdmin(dummy);
           
          await axios.get(`${Serverport}/admin/${temp.user_id}`)
          .then(res => {
            // console.log(res); 
            setData(res.data);
            setLoading(false);
          })
          .catch((err=>{
            console.log(err);
            setLoading(false);
            // setErrorpage(true);
          }))
        }
      },[])
      // console.log(data.posts);
    return(
        <>
          {loading?<Loader/>:<>
            <Navbar/>
            <div className="profile-banner">
                <img  className="cover-photo" src={Admin.cover__photo}/>
                <div className="user-info">
                    <div className="profile-inner1">
                        <img src={Admin.profile__photo} />
                    </div>
                    <div className="profile-inner2">
                        <h1>{Admin.username}<br/><br/></h1>
                    </div>
                    
                </div>
                <div className="profile-controls">
                    Edit Profile
                    <div className="dropdown-controls">
                        <Link className="controls-link" to="/update_profile_photo" >Profile Photo</Link>
                        <Link className="controls-link" to="/update_cover_photo" >Cover Photo</Link>
                    </div>
                </div>
                <div className="posts_div">
                      {
                    data.length<=0?"No Post Available":<>
                                {
                                    data.posts.map((e)=>{
                                      return(
                                          <Posts image={e.image} category={e.category} title={e.title} author={e.username} body={e.body} blog_id={e._id} />

                                      )
                                    })
                                }
                          </>
                  }
                </div>
            </div>
        </>
          }
          </>
            
    )
}

export default Adminprofile;