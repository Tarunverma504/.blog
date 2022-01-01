const express=require('express');
const router= express.Router();
const multer = require("multer");
const Blogs = require("../model/blogs");
const User = require("../model/user");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret:process.env.api_secret,
})
  router.post('/photo/blog', async(req, res, next)=>{
      try{
        const file = req.files.blog_img;
        const fileName = file.filename;
        await cloudinary.uploader.upload(file.tempFilePath, async function(err, result){
          console.log("Error: ",err);
          const url = result.url;
          res.status(200).send(url);
        });
      }
      catch{
        res.status(500).send({ message: "Something Went Wrong"});
      }
  })


  router.post('/post/blog', async(req, res, next)=>{
      // console.log(req.body);
      const username = req.body.user;
      const image = req.body.image;
      const title = req.body.title;
      const category = req.body.category;
      const body = req.body.blog;
      const userid = req.body.userid;
      const d= await Blogs.create({
        username:username,
        image: image,
        title: title,
        body: body,
        category: category,
        userid:userid,
      });
      
      var addid=await User.findByIdAndUpdate({_id:userid},{$push:{posts:d._id}});

      res.status(200).send(addid);
  })

module.exports = router;
  
