const mongoose =require( "mongoose");
const reviewschema =require( "./reviewmodel.js")


const productschema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    // reviews:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:reviewschema,
        
    // },
    // rating:{
    //     type:Number,
    //     default:0
    // },
    // numReviews:{
    //     type:Number,
    //     default:0
    // },
    price:{
        type:Number,
        default:0,
        required:true
    },
    countInstock:{
        type:Number,
        default:0,
        require:true
    },
    averageRating:{
        type:Number,
        default:0
    },
    numRating:{
        type:Number,
        default:0
    },
     review:[
        {
            name:{
                type:String,

            },
            rating:{
                type:Number,
                
            },
            comment:{
                type:String,
                
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
            reviewdAt:{
                type:Date
            }
        }
     ]

},{
    timestamps:true
})

// productschema.virtual("reviews",{
//     ref:"Review",
//     localField:"_id",
//     foreignField:"review"
// })

const Product = mongoose.model("Product",productschema);

module.exports = Product;