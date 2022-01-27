import React ,{useState} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  useParams } from 'react-router-dom';
import axios from "axios";
import "../../style/Forgetform.css";
import Loader from "../loader";
import {Serverport} from "../../server_url";
function Resetform({history}){
    const [pass,setPass]=useState("");
    const [cpass,setCpass]=useState("");
    const [errmsg,setErrmsg]=useState("");
    const [loading, setLoading]=useState(false);
    const params = useParams();
    const submit=async ()=>{
      setLoading(true);
        if(pass===cpass){
            var obj={
                pass:pass,
                cpass:cpass,
                id:params.id
            }
            const config={
              headers: {
                'Content-Type': 'application/json',
              }
            }
            if(pass.trim().length<1 || cpass.trim().length<1){
              setLoading(false);
              return;
            }
            try{
              await axios.post(`${Serverport}/reset`,obj,config);
              setLoading(false);
              alerting("Password Updated.")
            }
            catch(err){
              setLoading(false);
                console.log(err);
            }
        }
        else{
            setErrmsg("*Confirmation password doesn't matched");
        }
        
      }
      function alerting(msg){
        setLoading(false);
        alert(msg);
        
        history.push('/login');
      }

    return (
        <>
        {loading?<Loader/>:""}
         <div className="forget-container">
             <div className="register-div">
                 <h2 style={{color:"#5ee0aa"}}>.blog</h2>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Password" required/><br/>
                    <input type="password" value={cpass} onChange={(e)=>setCpass(e.target.value)} placeholder="Confirm Password" required/><br/>
                    <span style={{color:"red",fontSize:"14px"}}>{errmsg}</span>
                     <br/>
                     <button className="register-btn" style={{marginTop:"0px"}} onClick={submit}>Submit</button><br/>
             </div>
         </div>
        </>
     );
}

export default Resetform;