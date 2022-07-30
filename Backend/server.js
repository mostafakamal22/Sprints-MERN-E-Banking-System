require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");
connectToMongoose();

//middlewares
//express json parser middleware
app.use(express.json());

//cors middleware
const { corsProOptions } = require("./config/corsConfig");
app.use(cors(corsProOptions));

// Apply the rate limiting middleware to API calls only
const {
  apiLimiter,
} = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

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
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "dist", "index.html")
    )
  );
}

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
