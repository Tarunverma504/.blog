
import Navbar from "./Home/navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import Loader from "./loader";
import { Link, useParams } from 'react-router-dom';
import "../style/createpost.css";
import "../style/error.css";

const Serverport="http://localhost:8000";
function Errorpage({history}){
    return(
        <>
            {/* {loading?<Loader/>:""} */}
            <div className="error_outer_div">
                <div className="error_inner_div">
                    <div className="sad_icon">
                        <h1>:(</h1>

                    </div>
                    <div className="message_div">
                            <h1>404</h1>
                            <h6>Oops! Something went wrong.</h6><br/>
                            <Link to="/" className="home_btn">Home Page</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Errorpage;