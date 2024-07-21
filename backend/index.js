require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./router/users/userRouter");
const taskRouter=require("./router/tasks/taskRouter")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/tasks", taskRouter);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database Connect Successfully");
    app.listen(port, () => {
      console.log(`Server Running On Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
