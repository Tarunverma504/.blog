const express=require('express');
const router= express.Router();
const User=require("../model/user");
const fileUpload = require('express-fileupload');
const multer = require("multer");


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//         console.log(file.originalname); 
//       cb(null, file.originalname)
//     }
// })
// var upload = multer({ storage: storage })



// router.post("/profilephoto",upload.single('profile-file'),async(req,res,next)=>{

//     console.log(JSON.stringify(req.file))
//     res.send("vmdfvf");
// })


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
    cb(uploadError, "public/cover_photos");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });



router.post('/coverphoto/:id', upload.single('cover'), async(req, res, next)=>{
  try{
    const file = req.file;
    const fileName = file.filename;
    const userid = req.params.id;
    // const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const basePath = `${req.protocol}://${req.get("host")}/public/cover_photos/${fileName}`;
    console.log(basePath+fileName);

    // var response = '<a href="/">Home</a><br>'
    // response += "Files uploaded successfully.<br>"
    // response += `<img src="${req.file.path}" /><br>`
    // res.status(200).send({message:"Profile Updated Successfully :)"});
    const up = await User.findByIdAndUpdate({_id:userid},{cover_photo:basePath},{new: true});
    res.status(200).send(up);
  }
  catch{
      res.status(500).send({ message: "Something Went Wrong"});
  }
})


module.exports= router;