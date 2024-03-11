const express = require( "express");
const Productcontroller =require( '../Controller/productcontroller');
const authcontroller = require("../Middleware/authmiddleware")
const Reviewcontroller = require("../Controller/reviewcontroller")

const router = express.Router();



router.route("/").get(Productcontroller.getAllProduct).post(authcontroller.protect,authcontroller.admin,Productcontroller.createproduct)



router.route("/top").get(Productcontroller.getTopProduct)

router.route("/:id").get(Productcontroller.getSingleProduct)
.put(authcontroller.protect,authcontroller.admin,Productcontroller.updateProduct)
.delete(authcontroller.protect,authcontroller.admin,Productcontroller.deleteProduct)
// router.route("/:id/review").post(authcontroller.protect,Reviewcontroller.createreview).get(authcontroller.protect,Reviewcontroller.getReview)
// router.route("/:id/reviews").get(authcontroller.protect,Reviewcontroller.getsingleReview)
// router.route("/:id/productreviews").get(authcontroller.protect,Productcontroller.getsingleReview)

router.route("/:id/review").post(authcontroller.protect,Productcontroller.createReview)
router.route("/:id/review/view").get(authcontroller.protect,Productcontroller.getAllReview)


module.exports = router;