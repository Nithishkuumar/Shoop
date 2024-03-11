const jwt = require("jsonwebtoken");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/appError");
const User = require("../Models/usermodel");

 exports.protect = catchasync(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;


    if(token){
        try {
            const decodedToken = jwt.verify(token,process.env.SECRET);
            // console.log(decodedToken);
            req.user = await User.findById(decodedToken.userId).select("-password");
            // console.log(req.user);
            next();
            
        } catch (error) {
            return next(new AppError("Invalid Token",401));
        }
        

    }else{
       return next(new AppError("Not authorized . No token",401))
    }
})

 exports.admin = catchasync(async(req,res,next)=>{
   if(req.user && req.user.isAdmin){
    next();
    }else{
       return next(new AppError("Admin Only",401))
    }
})