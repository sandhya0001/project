const express = require("express");
const router = express.Router();
const {
  addEvent,
  getAllEvent,
  getEventsByCategory,
} = require("../controllers/eventController");
router.post("/addevent", addEvent);
router.get("/allevents", getAllEvent);
router.get("/category/:category", getEventsByCategory);
module.exports = router;
