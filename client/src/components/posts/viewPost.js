
import Navbar from "../Home/navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import Loader from "../loader";
import { useParams } from 'react-router-dom';
import Errorpage from "../error";
import Readpost from "./readPost";
import Comment from "./comment";
import {Serverport} from "../../server_url";
function Viewpost({history}){
    const params = useParams();
    const [loading, setLoading]=useState(false);
    const [data,setData]=useState([]);
    const [comments, setComments] = useState([]);
    const [errorpage, setErrorpage] = useState(false);
    const [img, setImg] = useState('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQacFQdbOawHrPLccZTIPijoRJ7oFoaW7V9ckq7-KDlmSuhLwER');
    const [Admin_id, setAdmin_id]=useState('');
    const [postcomment, setPostcomment]=useState('');
    const [Admin_photo,setAdmin_photo]=useState('');
    const [Admin_name,setAdmin_name]=useState('');

    useEffect(async()=>{
        setLoading(true);
       await axios.get(`${Serverport}/view/blog/${params.id}`)
        .then(res => {
          setData(res.data);
          setComments(res.data.comment);
          setLoading(false);
        })
        .catch((err=>{
          console.log(err);
          setLoading(false);
          setErrorpage(true);
        }))

        const r=sessionStorage.getItem("UserData");
        if(r==null){
          console.log("empty");
          setAdmin_id("");
        }
        else{
          const temp=JSON.parse(r);
          setAdmin_id(temp.user_id);
          setAdmin_photo(temp.profile__photo);
          setAdmin_name(temp.username);
        }
        
       
    },[])
    const uploadCommnet = async(e)=>{
      e.preventDefault();
      if(Admin_photo.trim().length<=0 || Admin_name.trim().length<=0 || Admin_id.trim().length<=0){
        alert("You need to login first");
        setPostcomment('');
      }
      else if(postcomment.trim().length<=0){
        setPostcomment('');
      }
      else{
        var obj={
          username:Admin_name,
          user_id:Admin_id,
          user_photo:Admin_photo,
          comment:postcomment,
        }
        const config={
          headers: {
            'Content-Type': 'application/json',
          }
        }
        try{
          await axios.post(`${Serverport}/comment/${data._id}`,obj,config);
          await axios.get(`${Serverport}/view/blog/${params.id}`)
          .then(res => {
            setData(res.data);
            setComments(res.data.comment);
            setPostcomment('');
            setLoading(false);
          })
          .catch((err=>{
            console.log(err);
            setLoading(false);
            setErrorpage(true);
          }))
        }
        catch(err){
          alert("Something Went Wrong");
        }
      }
    }
    return(
        <>
            <Navbar/>
            {loading?<Loader/>:""}
            {errorpage?<Errorpage/>:<Readpost blog_id={data._id} image={data.image} title={data.title} body={data.body} userid={data.userid} category={data.category} author={data.username} Admin_id={Admin_id} date={data.Date}/>}
            <div className="create-blog-outer">
              <h1 style={{color:"#5C5C5C",textDecoration:"underLine"}}>Comments:</h1>
            </div>
            {
                comments.map((e)=>{
                  return(
                      <>
                        <Comment image={e.user_photo} blog_id={data._id} comment_id={e._id} Author_id={data.userid} commentor_id={e.user_id} Admin_id={Admin_id} text={e.comment} username={e.username} user_id={e.user_id} date={e.Date}/>
                      </>
                    )
                  
                })
              }

              <div className="create-blog-outer">
                  <form onSubmit={uploadCommnet}>
                    <input className="post-comment" type="text" value={postcomment} onChange={(e)=>setPostcomment(e.target.value)} placeholder="Post Comment" required />
                    <button type="submit" className="publish_btn" style={{float:"left", marginLeft:"20px",marginTop:"20px"}}>Post</button>
                </form>
            </div>
              
            
        </>
    )
}

export default Viewpost;