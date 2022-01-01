
import "../../style/posts.css";
import { Link } from "react-router-dom";

function Posts(props){
    return(
        <>
            <Link to={`/view/blog/${props.blog_id}`} className="link-btn ">
            <div className="card">
                {/* <img src={image1}/> */}
                <div className="card-img">
                    <img src={props.image}/>
                </div>
                <div className="card-container">
                    <Link to={`/category/${props.category}`}className="link-btn "><p className="post-text">{props.category}</p></Link>
                    <h6 className="post-heading">{props.title}</h6>
                    <Link to={`/Author/${props.author_id}`} className="link-btn "><p className="post-text">Author: {props.author}</p></Link>
                    <p className="post-detail">{props.body} </p> 
                </div>
            </div>
        </Link>
        </>
    )
}

export default Posts;