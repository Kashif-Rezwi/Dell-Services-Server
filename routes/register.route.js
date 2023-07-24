const express = require("express");
const bcrypt = require("bcrypt");
const registerRouter = express.Router();
const { generateOTP } = require("../utils/generateOTP");
const { UserVerificationModel } = require("../models/userVerification.model");
const { sendEmails } = require("../utils/sendEmails");
const { UserModel } = require("../models/user.model");

// creating new user
registerRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let userExists = await UserModel.find({ email: email });

    if (userExists.length > 0) {
      return res.send({ msg: "User already exists!" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.send({ error: err.message });
      }

      const otp = generateOTP();
      const emailVerification = await sendEmails({ email, otp });
      console.log({ emailVerification });

      if (emailVerification === undefined) {
        return res.send("Invalid recipients email id!");
      }

      const newUserVerification = new UserVerificationModel({
        firstName,
        lastName,
        email,
        password: hash,
        otp,
      });
      await newUserVerification.save();

      res.send({
        msg: "User Verification OTP sent successfully.",
        userDetails: {
          firstName,
          lastName,
          email,
          password: hash,
        },
      });
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

// verifying new user
registerRouter.post("/user-verification", async (req, res) => {
  const { firstName, lastName, email, password, otp } = req.body;

  try {
    let userExists = await UserVerificationModel.find({ email: email });

    if (userExists.length > 0) {
      if (userExists[0].otp === Number(otp)) {
        const userDetails = { firstName, lastName, email, password };
        const newUser = new UserModel(userDetails);
        await newUser.save();
        res.send({ status: true });
        await UserVerificationModel.deleteMany({ email: email });
      } else {
        res.send({ status: false });
      }
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = { registerRouter };
