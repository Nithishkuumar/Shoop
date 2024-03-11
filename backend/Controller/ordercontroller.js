const mongoose = require("mongoose")
const Order = require("../Models/ordermodel");
const AppError = require("../utils/appError");
const catchasync = require("../utils/catchasync");



exports.addOrderitem = catchasync(async(req,res,next)=>{
    const {orderItems , shippingAddress,paymentMethod,itemprice,taxprice,shippingprice,totalprice} = req.body

    if(orderItems && orderItems.length === 0){
       return next(AppError("Order items is empty",400))
    }else{
    const order = new Order({
         orderItems:
            orderItems.map((item)=>({
                ...item,product:item._id,
                _id:undefined

            })),
         user:req.user._id,
         shippingAddress,
         paymentMethod,
         itemprice,
         taxprice,
         shippingprice,
         totalprice
    })
    const createorder = await order.save();
    res.status(200).json(createorder)
}

})

exports.getOrder = catchasync(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json(orders);

})

exports.getOrderByid = catchasync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
     

 if(order){
    res.status(200).json(order)
}else{
    return next(new AppError("No order found",404))
}
})

exports.updateOrderTopaid = catchasync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true,
        order.paidAt=Date.now()
        
        const updateorder = await order.save();
        res.status(200).json(updateorder)
    }
    else{
        return next(new AppError("Order Not Paid",404))
    }
})


exports.UpdateOrderDelievered = catchasync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelievered=true,
        order.delieveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder)

    }else{
        next(new AppError("Unable to deliver order",404))
    }
})

exports.getAllOrders = catchasync(async(req,res,next)=>{
    const order = await Order.find({}).populate("user","id name")

    if(order){
        res.status(200).json(order)
    }else{
        next(new AppError("Something went wrong in getting orders",404))
    }
})

// exports.createReview = catchasync(async(req,res,next)=>{
//     const {orderItems}= await Order.findById(req.params.id)

//     // const product = orderItems.name;

//     // const productorder = await product.populate("product")

//     const product = orderItems.map((item)=>(item.product))

   

//     // if(order.isDelievered){
//     //     return next(new AppError("Order not delivered",404))
//     // }else{
//     //      res.status(200).json(order)
//     // }

//     res.status(200).json(product)

// })