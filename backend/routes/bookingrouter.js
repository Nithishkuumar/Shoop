const express = require("express");
const authcontroller = require("../Middleware/authmiddleware")
const BookingController = require("../Controller/bookingcontroller")

const router = express.Router();


router.route("/:id").get(authcontroller.protect,BookingController.getCheckoutsession)

module.exports = router;