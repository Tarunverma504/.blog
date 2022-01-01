import Navbar from "../Home/navbar";
import React ,{useState,useEffect} from "react";
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from "../loader";
import "../../style/createpost.css";

const Serverport="https://dot-blog.herokuapp.com";

function Editpost({history}){

    const params = useParams();
    const [loading, setLoading]=useState(false);
    const [data,setData]=useState([]);
    const [imgUrl, setUrl]=useState('');
    const [filename,setFilename]=useState('');
    const [img, setImg]=useState('');
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [category,setCategory]=useState('');

    
    useEffect(async()=>{    
        setLoading(true);
       await axios.get(`${Serverport}/view/blog/${params.id}`)
        .then(res => {
          setData(res.data);
          setUrl(res.data.image);
          setCategory(res.data.category);
          setTitle(res.data.title);
          setBlog(res.data.body);
          setLoading(false);
        })
        .catch((err=>{
          console.log(err);
          setLoading(false);
        }))
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
            // console.log(imgUrl);
            setLoading(false);
            
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }

    }

    const uploadPost = async(e)=>{
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
            const res=await axios.post(`${Serverport}/update/blog/${params.id}`,obj,config);
            alerting("Blog Uploaded Successfully :)");
            setLoading(false);
            history.push(`/view/blog/${params.id}`);
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
    return(<>
            <Navbar/>
            {loading?<Loader/>:""}
            <div className="create-blog-outer">
                <div className="dummy_div"></div>
                <div className="image_div">
                    {imgUrl.length>0?<img className="blog-image" src={imgUrl}/> :<img  className="blog-image" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQacFQdbOawHrPLccZTIPijoRJ7oFoaW7V9ckq7-KDlmSuhLwER"/>}
                </div>
                <div className="image_category">
                    <div className="up_img">
                        <form onSubmit={uploadPhoto} encType='multipart/form-data' >
                            <label for="img">Change Image:</label><br/>
                            <input type="file" accept=".png, .jpg, .jpeg" id="img" name="img" accept="image/*" onChange={handlePhoto} /><br/>
                            {filename.length>0?<button className="upload_btn" type="submit">Upload</button>:"" }
                        </form>
                    </div>
                    
                    
                        <div className="select_category">
                            <label for="category" style={{marginRight:"10px"}}>Select Category:- </label>
                            <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
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


export default Editpost;