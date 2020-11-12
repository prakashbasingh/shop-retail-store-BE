const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const authRouterAdmin = require("../Auth/auth-router-admin.js");

const authenticate = require("../auth/authenticate-middleware.js");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/api/admin", authRouterAdmin);

server.get("/", (req, res) => {
  res.json({
    api: "This is Shop Retail Store Back-End. Server is Up and Running!!!!!!!!",
  });
});

module.exports = server;
