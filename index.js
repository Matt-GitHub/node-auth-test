const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 6400;
const userRouter = require("./db/api/index");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api", userRouter);

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
