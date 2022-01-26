const express=require('express');
const router= express.Router();
const Blogs = require("../model/blogs");
const User = require("../model/user");
const Comments = require("../model/comments");
router.post("/comment/:id",async(req,res)=>{
    let id = req.params.id;
    // const getBlog = await Blogs.findById({_id:id});
    let username=req.body.username;
    let user_id=req.body.user_id;
    let user_photo=req.body.user_photo;
    let comment = req.body.comment;
    let date = getDate();
    const d= await Comments.create({
        username:username,
        user_id:user_id,
        user_photo:user_photo,
        comment:comment,
        Date:date
    });
    var addid=await Blogs.findByIdAndUpdate({_id:id},{$push:{comment:d._id}});
    console.log(addid);
    res.send(addid);
});

router.post("/remove/comment/:id",async(req,res)=>{
    let id =req.params.id;
    let data = await Comments.findByIdAndRemove({_id:id});
    console.log(data);
    res.send();
})

function getDate(){
    let dt=new Date();
    let date=("0"+dt.getDate()).slice(-2);
    let month=("0"+(dt.getMonth()+1)).slice(-2);
    let year=dt.getFullYear();
    let d=date+"-"+month+"-"+year;
    return d;
}

module.exports = router;