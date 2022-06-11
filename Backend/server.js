require("dotenv").config();

const express = require("express");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");
connectToMongoose();

//middlewares
app.use(express.json());

//users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

//admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
