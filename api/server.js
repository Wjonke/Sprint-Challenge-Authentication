const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UsersRouter = require("../users/users-router");
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Base test - The API is running" });
});

module.exports = server;
