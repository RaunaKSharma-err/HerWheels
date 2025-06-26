const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const rideRoutes = require("./routes/ride.routes");
const path = require("path");
const port = process.env.PORT || 3000;
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const _dirname = path.resolve();

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/rides", rideRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
