const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    profile_photo:{
        type:String,
        default:"https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
        
    },
    cover_photo:{
        type:String,
        default:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQacFQdbOawHrPLccZTIPijoRJ7oFoaW7V9ckq7-KDlmSuhLwER"
    },
    otp:{
        type:String,
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }],
    Date:{
        type:String,
        require:true,

    }
    
})



const User = mongoose.model('User', userSchema);

module.exports = User;
