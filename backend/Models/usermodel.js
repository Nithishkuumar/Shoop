const mongoose =require( "mongoose");
const {isEmail} =require( "validator/lib/isEmail");
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Provide a email"],
        unique:true,
        validator:[isEmail,"Invalid Email"]
    },
    password:{
        type:String,
        required:true,
    },
    // passwordconfirm:{
    //     type:String,
    //     required:true,
    //     validate:{
    //         validator:function(el){
    //             return el===this.password;
    //         },
    //         message:"Password Mismatch please enter the correct password"
    //     }

    // },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    }
    
},{
    timestamps:true
})

userschema.methods.passwordVerify = async function(currentpassword){
    return await bcrypt.compare(currentpassword,this.password)

}

userschema.pre("save",async function(next){
    // works only password confirm matches //
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,12);
    this.passwordconfirm = undefined;
    next();

})


const User = new mongoose.model("User",userschema);


module.exports = User;