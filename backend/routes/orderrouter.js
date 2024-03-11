const express = require("express");
const authcontroller = require("../Middleware/authmiddleware")
const Ordercontroller = require("../Controller/ordercontroller")
const Reviewcontroller = require("../Controller/reviewcontroller")

const router = express.Router();

router.route("/").post(authcontroller.protect,Ordercontroller.addOrderitem).get(authcontroller.protect,Ordercontroller.getAllOrders);
router.route("/myorders").get(authcontroller.protect,Ordercontroller.getOrder)
router.route("/:id").get(authcontroller.protect,Ordercontroller.getOrderByid)
router.route("/:id/deliver").put(authcontroller.protect,authcontroller.admin,Ordercontroller.UpdateOrderDelievered)
router.route("/:id/pay").put(authcontroller.protect,authcontroller.admin,Ordercontroller.updateOrderTopaid)





module.exports = router;