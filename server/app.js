const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const userRoutes=require('./routes/userRoutes');
const profilePhoto = require('./routes/profilePhoto');
const coverPhoto = require('./routes/coverPhoto');
const createPost = require('./routes/createPost');
const getPost = require('./routes/getPost');
const multer = require("multer");
const bcrypt=require("bcryptjs");
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost:27017/blog-db')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

    app.use(bodyParser.json());
    app.use(cors());
    
    app.use(express.static(path.join(__dirname, '/public')));
    // app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
    app.use("/public/profile_photos", express.static(__dirname + "/public/profile_photos"));
    app.use("/public/cover_photos", express.static(__dirname + "/public/cover_photos"));
    app.use("/public/blog_photos", express.static(__dirname + "/public/blog_photos"));
    console.log(__dirname);

//     const FILE_TYPE_MAP = {
//         "image/png": "png",
//         "image/jpeg": "jpeg",
//         "image/jpg": "jpg",
//       };
      
//       const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           const isValid = FILE_TYPE_MAP[file.mimetype];
//           let uploadError = new Error("invalid image type");
      
//           if (isValid) {
//             uploadError = null;
//           }
//           cb(uploadError, "public/uploads");
//         },
//         filename: function (req, file, cb) {
//           const fileName = file.originalname.split(" ").join("-");
//           const extension = FILE_TYPE_MAP[file.mimetype];
//           cb(null, `${fileName}-${Date.now()}.${extension}`);
//         },
//       });
      
//       const upload = multer({ storage: storage });
      

    
// app.post('/p', upload.single('profile'), function (req, res, next) {
//     const file = req.file;
//     const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
//     console.log(basePath+fileName);

//     var response = '<a href="/">Home</a><br>'
//     response += "Files uploaded successfully.<br>"
//     response += `<img src="${req.file.path}" /><br>`
//     return res.send(response+"snmxcnxbn");
//   })

  



app.use(express.urlencoded({ extended: true }));
 

app.use(userRoutes);
app.use(profilePhoto);
app.use(coverPhoto);
app.use(createPost);
app.use(getPost);
app.listen(process.env.PORT ||8000, (req, res) => {
    console.log('server running at port 8000');
});