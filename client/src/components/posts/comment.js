import { Link } from "react-router-dom";
import React  from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import {Serverport} from "../../server_url";
function Comment(props){
    const history = useHistory();
    async function deleteComment(comment_id){
        
        await axios.post(`${Serverport}/remove/comment/${comment_id}`)
            .then(res => {
                window.location.reload(false);
                console.log(res);              
            })
            .catch((err=>{
              console.log(err);
            }))

    }
    return(
        <>
            <div className="comment-outer">
                <div className="comment-inner1">
                <img src={props.image} />
                   </div>
                <div className="comment-inner2">
                     <Link to={`/Author/${props.Author_id}`} className="link-btn "><p className="user-text">{props.username}</p></Link>
                     <span>Date: {props.date}</span>
                     <p>{props.text}</p>
                     {
                        props.Author_id==props.Admin_id || props.commentor_id==props.Admin_id?<button onClick={() =>deleteComment(`${props.comment_id}`)} className="delete_comment">Delete Comment</button>:""
                     }
                     

                </div>
            </div>
        </>
    )

}
export default Comment;