const { Event } = require("../models/eventModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

//check file type
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
exports.addEvent = async (req, res) => {
  try {
    const {
      about,
      event_date,
      registration_price,
      event_managers,
      winner_prize,
      runnerup_prize,
      event_name,
      category,
    } = req.body;
    const event_managersObj = JSON.parse(event_managers);
    const file = req.files?.image;
    const supportedFiles = ["jpg", "jpeg", "png"];
    let imageurl =
      "https://res.cloudinary.com/dfrcswf0n/image/upload/v1722092104/RoomImages/vgwtyhexx9ysttmcrrxe.png";
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!isFileTypeSupported(fileType, supportedFiles)) {
        return res.status(400).json({
          success: false,
          message: "file format not supported",
        });
      }
      const response = await uploadFileToCloudinary(file, "Event-Image");
      imageurl = response?.secure_url;
    }
    const event = await Event.create({
      about,
      event_date,
      registration_price,
      event_managers: event_managersObj,
      winner_prize,
      runnerup_prize,
      poster: imageurl,
      event_name,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Event not created, try again",
      error: err.message,
    });
  }
};

//getAllEvent
exports.getAllEvent = async (req, res) => {
  try {
    const events = await Event.find();
    if (!events || events === undefined) {
      return res.status(404).json({
        success: false,
        message: "No event found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Events found",
        events: events,
      });
    }
  } catch (err) {
    return res.status(503).json({
      success: false,
      message: "Unable to fetches Events, try again",
      error: err,
    });
  }
};

//get event by category
exports.getEventsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const events = await Event.find({ category });

    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No events found for this category",
      });
    }

    // Send the events as a response
    res.status(200).json({
      success: true,
      message: `events of ${category} category`,
      events,
    });
  } catch (error) {
    console.error("Error fetching events by category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
