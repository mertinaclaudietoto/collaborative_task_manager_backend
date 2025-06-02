require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { clearAndInsertData } = require("./src/config/initBase");
const { DEFAULTDATA,APP } = require("./src/config/constant");

// import route app
const userRoutes = require("./src/routes/user.routes");


// conf app 
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected MongoDB ");
    clearAndInsertData(DEFAULTDATA);
  })
  .catch((err) => console.log(err));


app.use(`/${APP.name}/users`, userRoutes);

// app port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
