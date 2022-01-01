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
mongoose.connect(`${process.env.database_url}`)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

    app.use(bodyParser.json());
    app.use(cors());
    
    app.use(express.static(path.join(__dirname, '/public')));
    // app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
    app.use("/public/profile_photos", express.static(__dirname + "/public/profile_photos"));
    app.use("/public/cover_photos", express.static(__dirname + "/public/cover_photos"));
    app.use("/public/blog_photos", express.static(__dirname + "/public/blog_photos"));
    app.use(express.urlencoded({ extended: true }));
    

    app.use(fileUpload({
        useTempFiles: true
    }));
    app.use(userRoutes);
    app.use(profilePhoto);
    app.use(coverPhoto);
    app.use(createPost);
    app.use(getPost);
    app.listen(process.env.PORT ||8000, (req, res) => {
        console.log('server running at port 8000');
});