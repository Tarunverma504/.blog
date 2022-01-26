
import React  from "react";
import { Link} from 'react-router-dom';
import "../style/createpost.css";
import "../style/error.css";
import {Serverport} from "../server_url";
// const Serverport="https://dot-blog.herokuapp.com";
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