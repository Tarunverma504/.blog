const express=require('express');
const router= express.Router();
const User=require("../model/user");
const fileUpload = require('express-fileupload');
const multer = require("multer");

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
    cb(uploadError, "public/profile_photos");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });



router.post('/profilephoto/:id', upload.single('profile'), async(req, res, next)=>{
  try{
    const file = req.file;
    const fileName = file.filename;
    const userid = req.params.id;
    const basePath = `${req.protocol}://${req.get("host")}/public/profile_photos/${fileName}`;
    const up = await User.findByIdAndUpdate({_id:userid},{profile_photo:basePath},{new: true});
    res.status(200).send(up);
  }
  catch{
      res.status(500).send({ message: "Something Went Wrong"});
  }
})


module.exports= router;