const express=require('express');
const router= express.Router();
const Blogs = require("../model/blogs");
const User = require("../model/user");

  router.get("/get/posts",async(req,res)=>{
      const c = await Blogs.find({}).sort({ "_id": 0});
      // console.log(c);
      res.send(c);
  })

  router.get("/view/blog/:id",async(req,res)=>{
    try{
      const blog_id=req.params.id;
      console.log(blog_id);
      const getBlog = await Blogs.findById({_id:blog_id});
      res.status(200).send(getBlog);
    }
    catch{
        res.status(500).send();
    }
    
  })

  router.get("/get",async(req,res)=>{
   const r= await User.findById({_id:'61c19507b8f207c42d286f21'}).populate('posts');
    res.send(r);
  })

  router.get("/get/category/:option", async(req, res)=>{
    try{
      const opt = req.params.option;
      const data = await Blogs.find({category:opt});
      res.status(200).send(data);
    }
    catch(err){
      res.status(500).send(err);
    }
      
  })

  router.get("/remove/:admin_id/:post_id", async(req,res)=>{
    const admin_id=req.params.admin_id;
    const post_id = req.params.post_id;
      console.log(req.params.admin_id);
      console.log(req.params.post_id);

      await User.findByIdAndUpdate({_id:admin_id},{$pull:{posts:post_id}});
      await Blogs.findByIdAndRemove({_id:post_id});
      res.status(200).send("Successfully Deleted");
  })

module.exports = router;
  
