import React ,{useState,useEffect} from "react";
import '../../style/register.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import Loader from "../loader";
const Serverport="http://localhost:8000";

function Signup({history}) {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [errmsg,setErrmsg]=useState("");
    const [loading, setLoading]=useState(false);
    const submit=async ()=>{
      setLoading(true);
      var obj={
        user:username,
        password:pass,
        email:email
      }
      console.log(obj);
      const config={
        headers: {
          'Content-Type': 'application/json',
        }
      }
      try{
        if(username.trim().length<1 || pass.trim().length<1 || email.trim().length<1){
          setErrmsg("*Fill all the fields" );
          setLoading(false);
          return;
        }
        const res=await axios.post(`${Serverport}/signup`,obj,config);
        setLoading(false);
        setErrmsg("");
        history.push(`/${res.data}/verify`);
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
                    <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Email" /><br/>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Password" required/><br/>
                    <span style={{color:"red",fontSize:"14px"}}>{errmsg}</span>
                    <br/>
                    <button className="register-btn" onClick={submit}>Sign Up</button><br/>
                    <span style={{color:"grey"}}>Have an account? <Link to="/login" id="title" style={{color:"#5ee0aa"}}>Login</Link></span>
            </div>
        </div>
       {/* )} */}
       </>

    );
  }
  
export default Signup;
  
  