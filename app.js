require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { clearAndInsertData } = require("./src/config/initBase");
const { DEFAULTDATA,APP } = require("./src/config/constant");

// import route app
const userRoutes = require("./src/routes/user.route");
const ruleRoutes = require("./src/routes/rule.route");
const workRoutes = require("./src/routes/work.route");
const statusRoutes = require("./src/routes/status.route");





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
app.use(`/${APP.name}/rules`, ruleRoutes);
app.use(`/${APP.name}/status`, statusRoutes);
app.use(`/${APP.name}/works`, workRoutes);



// app port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
