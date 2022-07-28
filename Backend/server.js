require("dotenv").config();
const path = require("path");
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

//account requests Router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

//serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "build", "index.html")
    )
  );
}

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
