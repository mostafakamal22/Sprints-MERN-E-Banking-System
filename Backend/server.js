require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");
connectToMongoose();

//middlewares
app.use(express.json());

//cors
const { corsDevOptions } = require("./config/corsConfig");
app.use(cors(corsDevOptions));

//users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

//admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

//account Router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
