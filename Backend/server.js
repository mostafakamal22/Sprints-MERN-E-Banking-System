require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

//users Route
const UsersRoute = require("./routes/users");
app.use("/api/users", UsersRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
