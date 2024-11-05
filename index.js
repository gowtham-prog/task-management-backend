const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const appRoute = require("./app/routes/appRoute");
const userRoute = require("./app/routes/userRoute");
const validateToken = require("./app/middlewares/validateToken");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(userRoute);
app.use(validateToken, appRoute);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.o8nnn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to the Database"))
  .catch(() => console.log("Connection failed with the Database"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening at ${port}...`);
});
