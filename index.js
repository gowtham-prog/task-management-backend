const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const app = express();

const appRoute = require("./app/routes/appRoute");
const userRoute = require("./app/routes/userRoute");
const validateToken = require("./app/middlewares/validateToken");

// Configure CORS options
const corsOptions = {
    origin: ["http://localhost:3000", "https://your-other-origin.com"], // Replace with your allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 200 // For legacy browser support
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
