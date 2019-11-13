const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/usersRoute");
const exerciseRouter = require("./routes/exercisesRoute");
require("dotenv").config();

const databaseURL = process.env.DATABASE_CONNECTION;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/exercises", exerciseRouter);

mongoose.connect(
  databaseURL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database");
  }
);

app.listen(port, () => {
  console.log("Server listening on Port 3000");
});
