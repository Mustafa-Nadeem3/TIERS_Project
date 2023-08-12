const express = require("express");
const router = express.Router();
const Room = require("../models/room.model");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({ status: "ok", rooms: rooms });
  } catch (error) {
    console.error("Room error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
