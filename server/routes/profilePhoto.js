const express=require('express');
const router= express.Router();
const User=require("../model/user");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret:process.env.api_secret,
})
router.post('/profilephoto/:id', async(req, res, next)=>{
  try{
    const file = req.files.profile;
    const userid = req.params.id;
    await cloudinary.uploader.upload(file.tempFilePath, async function(err, result){
      console.log("Error: ",err);
      const url = result.url;
      const up = await User.findByIdAndUpdate({_id:userid},{profile_photo:url},{new: true});
      res.status(200).send(up);
    });
    
  }
  catch{
      res.status(500).send({ message: "Something Went Wrong"});
  }
})


module.exports= router;