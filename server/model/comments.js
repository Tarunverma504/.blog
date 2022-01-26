const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    user_id:{
        type:String,
        trim:true,
        required:true,
    },
    user_photo:{
        type:String,
        default:"https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png" 
    },
    comment:{
        type:String,
    },
    Date:{
        type:String,
        require:true,
    }
    
})



const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
