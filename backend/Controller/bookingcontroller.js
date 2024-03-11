const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Order = require("../Models/ordermodel");
const catchasync = require("../utils/catchasync");

exports.getCheckoutsession = catchasync(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    const lineItems = order.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name,
                image:[item.image]
            },
            unit_amount:Math.round(item.price*100)
        },
        quantity:item.qty

    }))
    
    // create checkout session //

    stripe.checkout.session.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode:"payment",
        successurl:"http://localhost:3000/success",
    })

    res.json({id:session.id})
})