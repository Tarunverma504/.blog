import React ,{useState} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../../style/Forgetform.css";
import Loader from "../loader";
import {Serverport} from "../../server_url";
function Forget({history}){
    const [email,setEmail]=useState("");
    const [errmsg,setErrmsg]=useState("");
    const [loading, setLoading]=useState(false);

    const submit=async ()=>{
      setLoading(true);
        var obj={
            email:email
        }
        const config={
          headers: {
            'Content-Type': 'application/json',
          }
        }
        if(email.trim().length<1){
          setLoading(false);
          return;
        }
        try{
          await axios.post(`${Serverport}/forgot`,obj,config);
          setLoading(false);
          history.push('/login');
        }
        catch(err){
          setLoading(false);
            setErrmsg("*"+err.response.data.message);
            console.log(err.response.data.message);
        console.log(err);
        }
      }

    return (
        <>
        {loading?<Loader/>:""}
         <div className="forget-container">
             <div className="register-div">
                 <h2 style={{color:"#5ee0aa"}}>Forget Password</h2>
                     <input type="email" value={email} style={{marginTop:"20px"}} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"  required /><br/>
                     <span style={{color:"red",fontSize:"14px"}}>{errmsg}</span>
                     <br/>
                     <button className="register-btn" style={{marginTop:"0px"}} onClick={submit}>Send Mail</button><br/>
             </div>
         </div>
        </>
     );
}

export default Forget;