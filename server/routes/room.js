const express = require("express");
const router = express.Router();
const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({ status: "ok", rooms: rooms });
  } catch (error) {
    console.error("Room error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.post("/booked", async (req, res) => {
  try {
    await Room.findOneAndUpdate(
      { number: req.body.roomNumber },
      { available: false },
      { new: true }
    );

    const booked = await Booking.create({
      userID: req.body.id,
      roomID: req.body.roomNumber,
      name: req.body.name,
      adults: req.body.adults,
      children: req.body.children,
      checkInDate: req.body.checkIn,
      checkOutDate: req.body.checkOut,
      roomType: req.body.roomType,
    });

    console.log(booked)

    res.json({ status: "ok", booked: booked });
  } catch (error) {
    console.error("Room Booked error:", error);
    console.log(error)
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
