const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    userid:{
        type:String,
        trim:true,
    },
    image:{
        type:String,
        trim:true,
    },
    title:{
        type:String,
        trim:true,
    },
    body:{
        type:String,
        trim:true,
    },
    category:{
        type:String,
        trim:true,
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
    Date:{
        type:String,
        require:true,

    }
    
})



const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;
