const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;
    const user = await User.findById({
      _id: id,
    });
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/profile", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        image: {
          data: req.file.filename,
          contentType: "image/" + path.extname(req.file.originalname),
        },
      },
    );
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
