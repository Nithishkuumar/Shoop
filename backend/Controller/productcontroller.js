const mongoose = require( "mongoose");
const catchasync = require( '../utils/catchasync')
const Product = require( '../Models/productmodel')
const AppError = require( '../utils/appError');

exports.createproduct  = catchasync(async(req,res,next)=>{
    const product = new Product({
        name:"Sample Name",
        user:req.user._id,
        image:"/public/images/sample.jpg",
        price:0,
        category:"sample category",
        brand:"sample brand",
        description:"Sample description",
        countInstock:0,
       
    })

    const createdproduct = await product.save();
    
    if(createdproduct){
        res.status(200).json(createdproduct)
    }else{
        next(new AppError("Can't create product",404))
    }
      
    

})

exports.getAllProduct  = catchasync(async(req,res,next)=>{

    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword?{name:{$regex :req.query.keyword,$options:"i"}}:{};
    const count = await Product.countDocuments({...keyword})
     const products = await Product.find({...keyword}).limit(pageSize).skip(Number(pageSize * (page-1)));

       res.status(200).json({
        products,
        page,
        pages:Math.ceil(count/pageSize)
     })
})

exports.getSingleProduct  = catchasync(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
      const err = new AppError(("No product found",404));
      next(err);
   }

      res.status(200).json({
       status:"sucess",
       data:{
           product
       }
    })
})

exports.updateProduct = catchasync(async(req,res,next)=>{
    const { name,image,price,category,brand,description,countInstock} = req.body

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name,
        product.image = image,
        product.price= price,
        product.category = category,
        product.brand = brand,
        product.description=description,
        product.countInstock=countInstock

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    }else{
        next(new AppError("Resources not found",404))
    }

})

exports.deleteProduct = catchasync(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(product){
    const deletedproduct = await Product.deleteOne({_id:product._id});

    res.status(200).json({
        "message":"Product deleted"
    })}
    else{
        next(new AppError("Something wrong in deleting",404))
    }
})

exports.getAllReview = catchasync(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(product){
        res.status(200).json({
            product
        })
    }
    else{
        return next(new AppError("Could not find",404))
    }
})

exports.createReview = catchasync(async(req,res,next)=>{

    const product = await Product.findById(req.params.id)
     
    if(product){
        const isReviewed = product.review.find((prod)=>(
            prod.user.toString()===req.user._id.toString()
            
        ))
        if(isReviewed){
            return next(new AppError("User already reviewed",404))
        }else{
            const {rating,comment} = req.body
            // const date = Date.now();
            const review = {
                name:req.user.name,
                rating,
                comment,
                user:req.user._id,
               
            } 
            product.review.push(review)
            product.averageRating = Number(product.review.reduce((acc,review)=>acc+review.rating,0)/product.review.length).toFixed(2)
            product.numRating =product.review.length
            await product.save();
           
          

            res.status(200).json(product)   

        }
    }
    
})

exports.getTopProduct = catchasync(async(req,res,next)=>{
    const products = await Product.find({}).sort({rating:-1}).limit(3)

    res.status(200).json(products)
})

