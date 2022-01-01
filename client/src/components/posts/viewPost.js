
import Navbar from "../Home/navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import Loader from "../loader";
import { useParams } from 'react-router-dom';
import Errorpage from "../error";
import Readpost from "./readPost";
const Serverport="https://dot-blog.herokuapp.com";
function Viewpost({history}){
    const params = useParams();
    const [loading, setLoading]=useState(false);
    const [data,setData]=useState([]);
    const [errorpage, setErrorpage] = useState(false);
    const [img, setImg] = useState('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQacFQdbOawHrPLccZTIPijoRJ7oFoaW7V9ckq7-KDlmSuhLwER');
    const [Admin_id, setAdmin_id]=useState('');

    useEffect(async()=>{
        setLoading(true);
       await axios.get(`${Serverport}/view/blog/${params.id}`)
        .then(res => {
          setData(res.data);
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
          // console.log("data");
          const temp=JSON.parse(r);
          // console.log(temp.user_id);
          setAdmin_id(temp.user_id);
        }
        
       
    },[])
    // console.log(data);
    return(
        <>
            <Navbar/>
            {loading?<Loader/>:""}
            {errorpage?<Errorpage/>:<Readpost blog_id={data._id} image={data.image} title={data.title} body={data.body} userid={data.userid} category={data.category} author={data.username} Admin_id={Admin_id}/>}

        </>
    )
}

export default Viewpost;