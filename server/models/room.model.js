const mongoose = require("mongoose");

const Room = new mongoose.Schema(
  {
    number: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    availability: { type: String, require: true },
  },
  { collection: "room-data" }
);

const model = mongoose.model("RoomData", Room);

module.exports = model;
