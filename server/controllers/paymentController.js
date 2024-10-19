const Razorpay = require("razorpay");
require("dotenv").config();
const Payment = require("../models/paymentModel");
const {User} = require("../models/userModel");
const {Event} = require("../models/eventModel");
const crypto = require("crypto");
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Something Went Wrong!" });
      }
      res.status(200).json({ success: true, data: order });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "order failure, Try Again",
      Error: err,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    eventIds,
  } = req.body;
  try {
    // Generate the expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    // Check if the signature is authentic
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      try {
        // Update User's events
        const user=await User.findById(userId)
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        user.events.push(...eventIds);
        await user.save();

        // Update Events' users
        await Event.updateMany(
          { _id: { $in: eventIds } },
          { $addToSet: { users: userId } }
        );

        // Send success response
        return res.json({ success: true, message: "Payment Successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Error updating user or events",
          error,
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};
