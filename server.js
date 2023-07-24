const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { registerRouter } = require("./routes/register.route");
const { loginRouter } = require("./routes/login.route");
const { auth } = require("./middlewares/auth.middleware");
const { partsRouter } = require("./routes/parts.route");

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Wellcome to Dell-Server.");
});

server.use("/register", registerRouter);
server.use("/login", loginRouter);
server.use(auth);
server.use("/parts", partsRouter);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to database at port:${process.env.PORT}`);
  } catch (error) {
    console.log({ error });
  }
});
