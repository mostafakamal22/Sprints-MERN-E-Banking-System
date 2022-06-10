require("dotenv").config();

const express = require("express");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");
connectToMongoose();

//middlewares
app.use(express.json());

//users Route
const UsersRoute = require("./routes/usersRoutes");
app.use("/api/users", UsersRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
