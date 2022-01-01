import React ,{useState} from "react";
import '../../style/otp.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "../loader";
const Serverport="https://dot-blog.herokuapp.com";
function Otp({history}) {
    const [otp,setOtp]=useState("");
    const [loading, setLoading]=useState(false);
    const params = useParams()
    const submit=async ()=>{
      setLoading(true);
        var obj={
          id:params.id,
          otp:otp
        }
        const config={
          headers: {
            'Content-Type': 'application/json',
          }
        }
        if(otp.trim().length<1){
          setLoading(false);
          return;
        }
        try{
          await axios.post(`${Serverport}/verify`,obj,config);
          setLoading(false);
          history.push('/login');
        }
        catch(err){
          //console.log(err.response.data.message);
          setLoading(false);
          alerting(err.response.data.message);
        }
      }
    
      function alerting(msg){
        alert(msg);
        history.push('/signup');
      }
    return (
       <>
        {loading?<Loader/>:""}
        <div className="register-container">
            <div className="register-div">
                <h2 style={{color:"#5ee0aa"}}>Enter OTP</h2>
                    <p style={{color:"red"}}>*otp is send to your email address</p>
                    <input type="text" value={otp} style={{marginTop:"0px"}} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" required /><br/>
                    <br/>
                    <button className="register-btn" style={{marginTop:"0px"}} onClick={submit}>Verify</button><br/>
            </div>
        </div>
       </>
    );
  }
  
export default Otp;
  
  