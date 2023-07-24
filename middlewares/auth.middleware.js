const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "Dell", (err, decoded) => {
      if (decoded) {
        req.body.UserID = decoded.UserID;
        next();
      } else {
        res.send({ msg: err.message });
      }
    });
  } else {
    res.send({ msg: "Please login first." });
  }
};

module.exports = { auth };
