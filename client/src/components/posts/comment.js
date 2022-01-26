import { Link } from "react-router-dom";
import React  from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import {Serverport} from "../../server_url";
// const Serverport="https://dot-blog.herokuapp.com";
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
                <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" />
                    {/* <div className="commentor_img">
                        
                    </div> */}
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