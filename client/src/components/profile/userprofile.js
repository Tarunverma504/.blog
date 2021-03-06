import Navbar from "../Home/navbar";
import "../../style/userProfile.css";
import Loader from "../loader";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Posts from "../posts/posts";
import "../../style/posts.css";
import {Serverport} from "../../server_url";
function Userprofile({history}){
    const [loading, setLoading]=useState(false);
    const params = useParams();
    const [data,setData]=useState([]);

    useEffect( async()=>{
        setLoading(true);
        await axios.get(`${Serverport}/user/${params.id}`)
          .then(res => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err=>{
            console.log(err);
            setLoading(false);
          }))
    },[])
    return(
        <>
             {loading?<Loader/>:""}
            <Navbar/>
            <div className="profile-banner">
                <img  className="cover-photo" src={data.cover_photo}/>
                <div className="user-info">
                    <div className="profile-inner1">
                        <img src={data.profile_photo} />
                    </div>
                    <div className="profile-inner2">
                        <h1>{data.username}<br/><br/></h1>
                    </div>
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
        </>
    )
}

export default Userprofile;