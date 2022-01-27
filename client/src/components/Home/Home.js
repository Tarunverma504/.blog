
import Navbar from "./navbar";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
import Loader from "../loader";
import "../../style/Home.css";
import { Link } from "react-router-dom";
import Posts from "../posts/posts";
import {Serverport} from "../../server_url";
function Home() {

   const [data,setData]=useState([]);
   const [loading, setLoading]=useState(false);
   useEffect( async()=>{
      setLoading(true);
      await axios.get(`${Serverport}/get/posts`)
        .then(res => {
          setData(res.data);
          
        })
        .catch((err=>{
          console.log(err);
        }))
        setLoading(false);

    },[])

   const handleCategory= async()=>{
   }

  return (
     <>
         <Navbar/>
         {loading?<Loader/>:""}
         <div className="banner">
            <h1>.blog</h1>
        </div>
        <div className="home-outerdiv">
            <div className="home-inner1">
               <div className="categories">
                  <Link to="/create/post" className="create-btn">CREATE BLOG</Link>
                  <table>
                     <tr> <td><Link to="/" className="link-btn ">All categories</Link></td> </tr>
                     <tr> <td><Link to="/category/Music" className="link-btn ">Music</Link></td> </tr>
                     <tr> <td><Link to="/category/Movies" className="link-btn ">Movies</Link></td> </tr>
                     <tr> <td><Link to="/category/Sports" className="link-btn ">Sports</Link></td> </tr>
                     <tr> <td><Link to="/category/Tech" className="link-btn ">Tech</Link></td> </tr>
                     <tr> <td><Link to="/category/Fashion" className="link-btn ">Fashion</Link></td> </tr>
                     
                  </table>
               </div>
            </div>
            <div className="home-inner2">
            {
               data.length<=0?"No Post Available":<>
                           {
                              data.map((e)=>{
                                 return(
                                    <Posts image={e.image} category={e.category} title={e.title} author={e.username} body={e.body} author_id={e.userid} blog_id={e._id} filter={handleCategory}/>

                                 )
                              })
                           }
                     </>
            }
            </div>
        </div>
     </>
  );
}

export default Home;

