const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer();

const createTask = require("../services/createTask");
const updateTask = require("../services/updateTask");
const deleteTask = require("../services/deleteTask");
const allTasks = require("../services/allTasks");
const validateTask = require("../middlewares/validateTask");

app.get("/task/all", allTasks);
app.post("/task/create",upload.none(), validateTask, createTask);
app.patch("/task/update/:taskId",upload.none(), validateTask, updateTask);
app.delete("/task/delete/:taskId", deleteTask);

module.exports = app;
