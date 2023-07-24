const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = express.Router();

// user login
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let userExists = await UserModel.find({ email: email });

    if (userExists.length > 0) {
      bcrypt.compare(password, userExists[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ UserID: userExists[0]._id }, "Dell");
          res.send({
            status: "User login successfully.",
            token: token,
            UserID: userExists[0]._id,
            firstName: userExists[0].firstName,
            lastName: userExists[0].lastName,
            email: userExists[0].email,
          });
        } else {
          return res.send({ status: "Wrong Credentials!" });
        }
      });
    } else {
      res.send({ status: "User not exists!" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = { loginRouter };
