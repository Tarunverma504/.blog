
import Navbar from "../Home/navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import Loader from "../loader";
import "../../style/createpost.css";
import {Serverport} from "../../server_url";
function Createpost({history}){
    const [category,setCategory]=useState('');
    const [img, setImg]=useState('');
    const [imgUrl, setUrl]=useState('');
    const [filename,setFilename]=useState('');
    const [loading, setLoading]=useState(false);
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [userid, setUserid] = useState('');
    const [user, setUer]=useState('');
    useEffect(()=>{
        const r=sessionStorage.getItem("UserData");
        if(r==null){
            console.log("empty");
            setUserid('');
            setUer('');
            history.push("/login");
        }
        else{
            const temp=JSON.parse(r);
            setUserid(temp.user_id);
            setUer(temp.username);
          
          }
    },[])


    const handlePhoto = (e) => {
        if(e.target.files.length>0){
            setImg( e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
        
    }

    const uploadPhoto = async(e)=>{
        setLoading(true);
        e.preventDefault();
        const fd = new FormData();
        fd.append("name",filename);
        fd.append("blog_img",img);
        const config={
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        try{
            const res=await axios.post(`${Serverport}/photo/blog`,fd,config);
            await setUrl(res.data);
            setFilename('');
            setLoading(false);
            
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }

    }

    const uploadPost = async(e)=>{
        setLoading(true);
        e.preventDefault();
        if(imgUrl.trim().length<1){
            alerting("Please Upload img");
            setLoading(false);
            return;
        }
        if(title.trim().length<1){
            alerting("Your Title field is empty!!");
            setLoading(false);
            return;
        }
        if(blog.trim().length<1){
            alerting("Your Blog field is empty!!");
            setLoading(false);
            return;
        }
        if(category.trim().length<1){
            alerting("Please select category!!");
            setLoading(false);
            return;
        }

        var obj={
            user:user,
            userid:userid,
            image:imgUrl,
            category:category,
            title:title,
            blog:blog,
        }

        const config={
            headers: {
              'Content-Type': 'application/json',
            }
        }
        try{
            await axios.post(`${Serverport}/post/blog`,obj,config);
            alerting("Blog Uploaded Successfully :)");
            setLoading(false);
            history.push("/");
        }

        catch(err){
            setLoading(false);
           alerting("*"+err.response.data.message);
            console.log(err.response.data.message);
          }

    }

    function alerting(msg){
        alert(msg);
    }
    return(
        <>
            <Navbar/>
            {loading?<Loader/>:""}
            <div className="create-blog-outer">
                <div className="dummy_div"></div>
                <div className="image_div">
                    {imgUrl.length>0?<img className="blog-image" src={imgUrl} alt="image not found" /> :<img  className="blog-image" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQacFQdbOawHrPLccZTIPijoRJ7oFoaW7V9ckq7-KDlmSuhLwER" alt='image not found' />}
                </div>
                <div className="image_category">
                    <div className="up_img">
                        <form onSubmit={uploadPhoto} encType='multipart/form-data' >
                            <label for="img">Upload Image:</label><br/>
                            <input type="file" accept=".png, .jpg, .jpeg" id="img" name="img" accept="image/*" onChange={handlePhoto} /><br/>
                            {filename.length>0?<button className="upload_btn" type="submit">Upload</button>:"" }
                        </form>
                    </div>
                    
                    
                        <div className="select_category">
                            <label for="category" style={{marginRight:"10px"}}>Select Category:- </label>
                            <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                                <option value=""></option>
                                <option value="Movies">Movies</option>
                                <option value="Sports">Sports</option>
                                <option value="Tech">Tech</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Other">Other</option>
                            </select>
                            <br/><br/>
                        </div>
                </div>
                    {/* <hr/> */}
                <form onSubmit={uploadPost}>
                    <input className="title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
                    <textarea className="blog" type="text" value={blog} onChange={(e)=>setBlog(e.target.value)} placeholder="Write your Blog Here..." contenteditable required/>
                    <button type="submit" className="publish_btn">Publish</button>
                </form>
            </div>
        </>
    )
}

export default Createpost;