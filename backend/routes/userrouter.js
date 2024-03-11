const express = require( "express");
const Usercontroller =require('../Controller/usercontroller');
const authcontroller = require("../Middleware/authmiddleware")

const router = express.Router();



router.route("/").get(authcontroller.protect,authcontroller.admin,Usercontroller.getAlluser).post(Usercontroller.createuser)
router.route("/login").post(Usercontroller.authuser);


router.route("/profile").get(authcontroller.protect,Usercontroller.userProfile).put(authcontroller.protect,Usercontroller.updateProfile);
router.route("/:id").get(authcontroller.protect,authcontroller.admin,Usercontroller.getSingleUser)
.delete(authcontroller.protect,authcontroller.admin,Usercontroller.deleteuser)
.put(authcontroller.protect,authcontroller.admin,Usercontroller.edituserAdmin)
router.route("/logout").post(Usercontroller.logout);
router.route("/register").post(Usercontroller.registerUser);



module.exports = router;