const mongoose =require( "mongoose");
const { stripLow } =require( "validator");

const orderschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            qty:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            }
        }
    ],
    shippingAddress:{
       address:{
        type:String,
        required:true
       },
       city:{
        type:String,
        required:true
       },
       postalcode:{
        type:Number,
        required:true
       },
       country:{
        type:String,
        required:true
       }
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentResult:{
        id:{
            type:String,

        },
        status:{
            type:String
        },
        update_time:{
            type:String
        },
        email_address:{
            type:String
        }
    },
    itemprice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxprice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingprice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalprice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDelievered:{
        type:Boolean,
        required:true,
        default:false
    },
    delieveredAt:{
        type:Date
    },
   
  
},{
    timestamps:true
})

const Order = new mongoose.model("Order",orderschema);

module.exports = Order;