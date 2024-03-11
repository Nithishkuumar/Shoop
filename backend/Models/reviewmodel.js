const mongoose  =require( "mongoose");

const reviewschema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true
        // default:3
    },
    comment:{
        type:String,
        required:true
        // default:5
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
      
        ref:"User"
    },
    // order:{
    //     type:mongoose.Schema.Types.ObjectId,
       
    //     ref:"Order"
    // },
     product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
    
},{
    timestamps:true
})

const Review = new mongoose.model("Review",reviewschema);

module.exports = Review;