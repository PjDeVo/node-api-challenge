const express = require("express");

const server = express();
const projectsRouter = require("./projects.js");
const actionsRouter = require('./actions.js')

server.use(express.json());
server.use("/projects", projectsRouter);
server.use('/actions',actionsRouter )

server.get("/", (req, res) => {
  res.json({ api: "Server is running" });
});

module.exports = server;
