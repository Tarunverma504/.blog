const express=require('express');
const router= express.Router();
const multer = require("multer");
const Blogs = require("../model/blogs");
const User = require("../model/user");
const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");
  
      if (isValid) {
        uploadError = null;
      }
      cb(uploadError, "public/blog_photos");
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join("-");
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
  });
  
  const upload = multer({ storage: storage });

  router.post('/photo/blog', upload.single('blog_img'), async(req, res, next)=>{
      try{
        const file = req.file;
        const fileName = file.filename;
        const userid = req.params.id;
        const basePath = `${req.protocol}://${req.get("host")}/public/blog_photos/${fileName}`;
        res.status(200).send(basePath);
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
  
