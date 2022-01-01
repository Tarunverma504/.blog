const express=require('express');
const router= express.Router();
const User=require("../model/user");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret:process.env.api_secret,
})


router.post('/coverphoto/:id', async(req, res, next)=>{
  try{
    console.log("xczxncmnxc");
    const file = req.files.cover;
    const fileName = file.filename;
    const userid = req.params.id;
    console.log(userid);
    // const basePath = `${req.protocol}://${req.get("host")}/public/cover_photos/${fileName}`;
    await cloudinary.uploader.upload(file.tempFilePath, async function(err, result){
      console.log("Error: ",err);
      const url = result.url;
      console.log(url);
      const up = await User.findByIdAndUpdate({_id:userid},{cover_photo:url},{new: true});
      res.status(200).send(up);
    });
    
  }
  catch{
      res.status(500).send({ message: "Something Went Wrong"});
  }
})

// const multer = require("multer");

// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("invalid image type");

//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, "public/cover_photos");
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const upload = multer({ storage: storage });

//router.post('/coverphoto/:id', upload.single('cover'), async(req, res, next)=>{})




module.exports= router;