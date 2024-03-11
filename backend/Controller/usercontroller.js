const mongoose = require( "mongoose");
const catchasync = require( '../utils/catchasync')
const AppError = require( '../utils/appError');
const User = require("../Models/usermodel");
const jwt = require("jsonwebtoken")
const generateToken  = require("../utils/generateToken");

exports.createuser  = catchasync(async(req,res,next)=>{
    const user = await User.create(req.body);

    
       res.status(200).json({
       status:"success",
       data:{
           user
       }
    })
})

exports.getAlluser  = catchasync(async(req,res,next)=>{
     const users = await User.find({});

     if(users){
        res.status(200).json(users)
     }else{
        return next(new AppError("No users found",404))
     }
})

exports.getSingleUser  = catchasync(async(req,res,next)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
      const err = new AppError("No user found",404);
      return next(err);
   }

     res.status(200).json(user)
})

exports.authuser  = catchasync(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next( new AppError("Invalid email or password",401))
    }
     
    // generateToken(res,user._id);
    // const token = jwt.sign({userId:user._id},process.env.SECRET,{
    //     expiresIn:"30d"
    // })

    // if(!token){
    //     return next( new AppError("Invalid email or password",401))
    // }

    // res.cookie("jwt",token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV!=="development",
    //     sameSite:"strict",
    //     maxAge:30*24*60*60*1000
    // })

    if(user && await(user.passwordVerify(password))){
        // generate jwt token //
        generateToken(res,user._id);
        res.status(200).json({
            status:"success",
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
         })
    }
})

exports.logout = catchasync(async(req,res,next)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expiresIn: new Date(0)
    })

  res.status(200).json({
    "status":"success",
    "message":"Logged out ...!"

  })
})

exports.registerUser = catchasync(async(req,res,next)=>{
    const {email,name,password,isAdmin}= req.body;
    const existemail = await User.findOne({email});

    if(existemail){
        return next(new AppError("User already exists",400));
    }
    const user = await User.create({email,name,password,isAdmin})
    if(!user){
        return next (new AppError("Please enter all valid fields",401))
    }else{
        generateToken(res,user._id);
        res.status(200).json({
            status:"success",
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
         })
        }
})

exports.userProfile = catchasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    // console.log(user);

    if(!user){
        return next(new AppError("No user found",400))
    }

    res.status(200).json({
        status:"success",
        _id:user._id,
        name:user.name,
        email:user.email,
    })
})

exports.updateProfile = catchasync(async(req,res,next)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.email = req.body.email || user.email,
        user.name = req.body.name || user.name,
        user.isAdmin = req.body.isAdmin || user.isAdmin

        if(req.body.password){
            user.password = req.body.password
        }
    const updateduser = await user.save()
    res.status(200).json({
        status:"success",
        _id:updateduser._id,
        name:updateduser.name,
        email:updateduser.email,
    })}
    else{
        return next(new AppError("No user found",401))
    }
})

exports.deleteuser = catchasync(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
     
    if(user){
    const deleteduser = await User.deleteOne({_id:user._id})

    res.status(200).json({
        Message:"User Deleted "
        
    })
}else{
    return next(new AppError("No user found",404))
}
})

exports.edituserAdmin = catchasync(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
     
    if(user){
        user.name = req.body.name,
        user.email = req.body.email,
        user.isAdmin = req.body.isAdmin

        const userupdated = await user.save();

        res.status(200).json(userupdated);
    }else{
        return next(new AppError("Something error in updating user",404))
    }
})