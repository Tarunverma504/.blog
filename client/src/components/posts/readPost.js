import React  from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router";

import "../../style/readPost.css";
import { confirm } from "react-confirm-box";
import {Serverport} from "../../server_url";

function Readpost(props){
    const params = useParams();
    const history = useHistory();
    
    const deletPost = async()=>{
        const result = await confirm("Do You Want To Delete This Post?");
        if (result) {
           await axios.get(`${Serverport}/remove/${props.Admin_id}/${props.blog_id}`)
            .then(res => {
                history.push('/');
              
            })
            .catch((err=>{
              console.log(err);
            }))
            return;

        }
    }
    return(<>
            <div className="create-blog-outer">
                <div className="dummy_div"></div>
                <div className="view_image_div">
                    <img  className="view_blog-image" src={props.image}/>
                </div>
                {props.userid!=props.Admin_id?"":<>
                    <div className="blog_controls">
                        <Link to={`/edit/${props.blog_id}`}> <i className="fas fa-edit"></i></Link>
                        <i className="fas fa-trash-alt" onClick={deletPost}></i>
                    </div>
                    </>}
                
                <div className="about_blog">
                    <div className="about_blog_1">
                        <h5>Author: {props.author}</h5>
                        <h5>Category: {props.category}</h5>
                    </div>
                    <div className="about_blog_2">
                        <h5>{props.date}</h5>
                    </div>
                </div>
                <div className="whole_blog">
                    <h1 className="blog_title">{props.title} </h1><br/>
                    <p className="blog_body">{props.body}</p>
                </div>
                

            </div>
        </>)
}

export default Readpost;