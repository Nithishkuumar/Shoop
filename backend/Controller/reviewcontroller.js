// const mongoose = require("mongoose")
// const Product = require("../Models/productmodel");
// const AppError = require("../utils/appError");
// const catchasync = require("../utils/catchasync");
// const Review = require("../Models/reviewmodel");
// const User = require("../Models/usermodel");



// exports.createreview = catchasync(async(req,res,next)=>{
    
//     const product = await Product.findById(req.params.id)

//     const {rating,comment} = req.body
//     // const {isReviewed} = order
    
//    if(product){
//     const review = await Review.create({rating,comment,product:product._id})
//     product.review.push(review._id)
//     res.status(200).json(review)
//    }
    
//      else{
//     return next(new AppError("Order not delevered",404))
// }
// })

// exports.getReview = catchasync(async(req,res,next)=>{
//     const product = await Product.findById(req.params.id).populate("review")

//     if(product){

//         res.status(200).json(product)
//     }
//     else{
//         return next(new AppError("Could not find",404))
//     }
// })

// exports.getsingleReview = catchasync(async(req,res,next)=>{
//     const review = await Review.findById(req.params.id).populate("product")

//     if(review){

//         res.status(200).json(review)
//     }
//     else{
//         return next(new AppError("Could not find",404))
//     }
// })

