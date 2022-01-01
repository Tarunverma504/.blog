import React ,{useState,useEffect} from "react";
import '../../style/register.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../loader";
const Serverport="https://dot-blog.herokuapp.com";
function Login({history}) {
   
    const [username,setUsername]=useState("");
    const [pass,setPass]=useState("");
    const [errmsg,setErrmsg]=useState("");
    const [loading, setLoading]=useState(false);
    const submit=async ()=>{
        setLoading(true);
        var obj={
          user:username,
          password:pass
        }
        // console.log(obj);
        const config={
          headers: {
            'Content-Type': 'application/json',
          }
        }
       
        try{
          const res=await axios.post(`${Serverport}/login`,obj,config);
          setLoading(false);
          if(res.status!==200){
            throw Error(res);
          }
          
          
        const dummy={
          "user_id":res.data._id,
          "username":res.data.username,
          "profile__photo":res.data.profile_photo,
          "cover__photo":res.data.cover_photo,
        }
        sessionStorage.setItem("UserData",JSON.stringify(dummy));
        //sessionStorage.removeItem("UserData");
        const r=sessionStorage.getItem("UserData");
        if(r==null){
          console.log("empty");
        }
        else{
          // console.log("data");
         // const user=JSON.parse(r);
          // console.log(user.username);
        
        }
          history.push(`/`);
        }
        
        catch(err){
          setLoading(false);
          setErrmsg("*"+err.response.data.message);
          console.log(err.response.data.message);
        }
      }
    return (
       <>
       {loading?<Loader/>:""}
        <div className="register-container">
            <div className="register-div">
                <h1>.blog</h1>

                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required /><br/>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Password" required/><br/>
                    <span style={{color:"red",fontSize:"14px"}}>{errmsg}</span>
                    <br/>
                    <button className="register-btn" onClick={submit}>Login</button><br/>
                    <Link to="/forgot" id="title" style={{color:"grey"}}>Forgot Password?</Link><br/><br/>
                    <span style={{color:"grey"}}>Don't have an account?         <Link to="/signup" id="title" style={{color:"#5ee0aa"}}>Sign Up</Link></span>

            </div>
        </div>
       </>
    );
  }
  
export default Login;
  
  