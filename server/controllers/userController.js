const { User } = require("../models/userModel");
const sendMail = require("../utills/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
//check is file type support or not
function isFileTypeSupported(fileType, supportedFiles) {
  return supportedFiles.includes(fileType);
}
//upload image to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobile, otp, college,registration_no } = req.body;
    // const file = req.files?.image;

    email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser.password) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email id",
      });
    }
    if (existingUser.otp.code != otp) {
      return res.status(400).json({
        success: false,
        message: "wrong OTP",
      });
    }
    if (new Date(Date.now()) > existingUser.otp.validTime) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    // const supportedFiles = ["jpg", "jpeg", "png"];
    // let imageurl =
    //   "https://res.cloudinary.com/dfrcswf0n/image/upload/v1722092104/RoomImages/vgwtyhexx9ysttmcrrxe.png";
    // if (file) {
    //   const fileType = file.name.split(".").pop().toLowerCase();
    //   if (!isFileTypeSupported(fileType, supportedFiles)) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "file format not supported",
    //     });
    //   }
    //   const response = await uploadFileToCloudinary(file, "User-Profile");
    //   console.log("ok");
    //   imageurl = response?.secure_url;
    // }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
        error: err.message,
      });
    }
    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        password: hashedPassword,
        mobile,
        // profile_pic: imageurl,
        college,
        registration_no
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User can't created, Try again",
      error: err,
    });
  }
};

//otp for signup controller
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    email.toLowerCase();
    const code = Math.floor(1000 + Math.random() * 9000);
    otp = {
      code,
      validTime: new Date(Date.now() + 10 * 60 * 1000),
    };
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email id",
      });
    }
    if (existingUser) {
      const user = await User.findOneAndUpdate(
        { email },
        { otp },
        { new: true }
        );
      } else {
        const user = await User.create({
          email,
          otp,
        });
      }
    const mailMessage = `your otp for account creation is ${otp.code}`;
    const result = await sendMail(email, "verify email", mailMessage);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(501).json(result);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "cat't sent OTP",
      Error: err,
    });
  }
};

//login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all the details",
      });
    }
    email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not exist with this email",
      });
    }
    const payload = {
      email: user.email,
      _id: user._id,
      name: user.name,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = await jwt.sign(payload, process.env.SECRETCODE, {});
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failure, Try Again",
      Error: err,
    });
  }
};

//otp to changepassword

exports.sendOtpToChangePassword = async (req, res) => {
  try {
    const { email } = req.body;
    email.toLowerCase();
    const code = Math.floor(1000 + Math.random() * 9000);
    otp = {
      code,
      validTime: new Date(Date.now() + 10 * 60 * 1000),
    };
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User not exist with this email",
      });
    }

    const user = await User.findOneAndUpdate({ email }, { otp }, { new: true });
    const mailMessage = `your otp to change password is ${otp.code}`;
    const result = await sendMail(email, "verify email", mailMessage);

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(501).json(result);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "cat't sent OTP",
      Error: err,
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const { email, password, code } = req.body;
    email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser.otp.code != code) {
      return res.status(400).json({
        success: false,
        message: "wrong OTP",
      });
    }
    if (new Date(Date.now()) > existingUser.otp.validTime) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
        error: err.message,
      });
    }
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Password changed",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Password can't change, Try again",
      error: err,
    });
  }
};

//get user enrolled events
exports.userEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    // Populate the eventId field within the events array
    const user = await User.findById(userId).populate("events");
    if (!user || !user.events || user.events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User is not enrolled in any event",
      });
    } else {
      // Extract the populated event data
      return res.status(200).json({
        success: true,
        message: "Events found",
        events: user.events,
      });
    }
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(503).json({
      success: false,
      message: "Unable to fetch events, try again",
      error: err.message,
    });
  }
};




//logout
exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
