const express=require('express');
const router= express.Router();
const User=require("../model/user");
const otpGenerator = require('otp-generator');
const { findById } = require('../model/user');
const bcrypt=require("bcryptjs");
const sqMail = require("@sendgrid/mail");

require('dotenv').config();
const API_KEY=process.env.API_KEY;


sqMail.setApiKey(API_KEY);

router.post("/verify",async(req,res)=>{
    console.log(req.body);
    const result=await User.findById({_id:req.body.id});
    console.log(result.otp);
    if(result.otp == req.body.otp){
        res.status(200).send("verified");
    }
    else{
        await User.findByIdAndRemove({_id:req.body.id});
        res.status(403).send({ message: 'OTP Not Matched'});
    }
})

router.post('/login',async(req,res)=>{
    console.log(req.body);
    
    const username=req.body.user;
    const password=req.body.password;
    const result=await User.find({username:username});
    console.log(result);
    if(result.length==1){
        console.log("nd");
        
        const isMatch= await bcrypt.compare(password,result[0].password);
        console.log(isMatch);
            if(isMatch==false){
                res.status(403).send({ message: 'Invalid username or password'});
            }
            else{
                res.status(200).send(result[0]);
            }
    }
    else{
        console.log("error");
        res.status(403).send({ message: 'Invalid username or password'});
    }
})


router.post('/signup',async(req,res)=>{
    const username=req.body.user;
    let password=req.body.password;
    password = await bcrypt.hash(password,10);
    const email=req.body.email;

    const result = await User.find({email:email});
    const userExist = await User.find({username:username});
    if(result.length==0 &&  userExist.length==0 ){
        let date=await getDate();
        const otp=otpGenerator.generate(6, { upperCase: false, specialChars: false });
        const d= await User.create({
            username:username,
            email:email,
            password:password,
            otp:otp,
            Date:date
        });
        let msg=`Hi,\n Your OTP is: ${otp}`;
        sendOTP(email,msg);
        res.status(200).send(d._id);
    }
    else if(result.length>0){
        res.status(403).send({ message: 'Email is Already Registered'});
    }
    else if(userExist.length>0){
        res.status(403).send({ message: "Username is Already Taken"});
    }
    
})

router.post('/forgot',async(req,res)=>{
    const email=req.body.email;
    //console.log(email);
    //res.status(200).send(email);
    const result = await User.find({email:email});
    if(result.length==1){
        let msg=`<div style="margin:auto;width:350px;text-align:center;padding:5px 0px">
                    <h1> Hello,${result[0].username}</h1>		
                    <p>A request has been received to change the password for your .blog account.</p>
                    <a href="http://localhost:3000/${result[0]._id}/reset" style="background-color:#219ebc;padding:8px;color:white;text-decoration:none;"> Reset Password</a>
                </div>`;
        sendLINK(email,msg);
        res.status(200).send("Success");
    }
    else{
        res.status(403).send({ message: 'Email Not Found'});
    }
    
})

router.post('/reset',async(req,res)=>{
    console.log(req.body);
    let password=req.body.pass;
    password=await bcrypt.hash(password,10);
    let id=req.body.id;
    await User.findByIdAndUpdate({_id:id},{password:password});
    res.status(200).send("Success");
})

router.get('/admin/:id',async(req,res)=>{
    const id = req.params.id;
   const data =  await User.findById({_id:id}).populate("posts");
    console.log(data);
    res.status(200).send(data);
})

router.get('/user/:id',async(req,res)=>{
    const id = req.params.id;
   const data =  await User.findById({_id:id}).populate("posts");
    console.log(data);
    res.status(200).send(data);
})

function getDate(){
    let dt=new Date();
    let date=("0"+dt.getDate()).slice(-2);
    let month=("0"+(dt.getMonth()+1)).slice(-2);
    let year=dt.getFullYear();
    let d=date+"-"+month+"-"+year;
    return d;
}


async function sendOTP(email,msg){
    const message={
        to:`${email}`,
        from:'vermatarun4305@gmail.com',
        subject: '.blog',
        text: `${msg}`,
        
    };
    await sqMail.send(message)
    .then((response)=>{
        console.log('Email Send..0')
    })
    .catch((err)=>{console.log(err)})
}

async function sendLINK(email,msg){
    const message={
        to:`${email}`,
        from:'vermatarun4305@gmail.com',
        subject: '.blog',
        html: `${msg}`,
        
    };
    await sqMail.send(message)
    .then((response)=>{
        console.log('Email Send..0')
    })
    .catch((err)=>{console.log(err)})
}
















module.exports= router;
