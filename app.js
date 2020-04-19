const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

let userModel = require("./model/user.model");

mongoose
  .connect(process.env.DB_REMOTE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to the database.`);
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set("useCreateIndex", true);
const usersRouter = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
