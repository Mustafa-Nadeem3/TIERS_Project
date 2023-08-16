const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "mustafanad123@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  const mailOption = {
    from: `Hotel Haven <mustafanad123@gmail.com>`,
    to: req.body.email,
    subject: "Newsletter",
    html: `<p>Thank You for signing into our newsletter</p>`,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      res.json({ status: "error", error: err });
    } else {
      res.json({ status: "ok", email: "Email Sent" });
    }
  });
});

module.exports = router;
