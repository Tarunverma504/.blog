
import "../../style/photo-upload.css";
import React ,{useState,useEffect} from "react";
// import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../loader";
import {Serverport} from "../../server_url";
// const Serverport="https://dot-blog.herokuapp.com";
function Profilephoto({history}){
    
    const [profile,setProfile]=useState({});
    const [filename,setFilename]=useState('');
    const [userid, setUserid]=useState('');
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        const r=sessionStorage.getItem("UserData");
    const temp=JSON.parse(r);
    setUserid(temp.user_id);
    }, [])
    
    const handlePhoto = (e) => {
        setProfile( e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        // console.log(profile);
        const fd = new FormData();
        fd.append("name",filename);
        fd.append("profile",profile);
          const config={
            headers: {
                "Content-Type": "multipart/form-data",
            }
          }
          try{
            // console.log(fd);
            const res=await axios.post(`${Serverport}/profilephoto/${userid}`,fd,config);
            // setErrmsg("");
            const dummy={
                "user_id":res.data._id,
                "username":res.data.username,
                "profile__photo":res.data.profile_photo,
                "cover__photo":res.data.cover_photo,
              }
            await sessionStorage.setItem("UserData",JSON.stringify(dummy));
            // console.log(res.data.profile_photo);
            
            alert("Profile Updated :)");
            setLoading(false);
            history.push('/');
            // console.log(res);
          }
          
          catch(err){
            // setErrmsg("*"+err.response.data.message);
            setLoading(false);
            alert(err.response.data.message);
            console.log(err.response.data.message);
          }
    }

    return(
        <>
          {loading?<Loader/>:""}
            <div className="photo-upload">
                <i className="fas fa-cloud-upload-alt"></i>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} id="file" className="inputfile" />
                <label className="inputfile-label" for="file">{filename.length == 0?"Choose a file":filename}</label>
                    <br/>
                    {filename.length == 0?"":<button type="submit" className="btn-upload">Upload</button>}
                    
                </form>
            </div>
        </>
    )
}

export default Profilephoto;