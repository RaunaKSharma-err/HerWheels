import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://192.168.254.4:8081"], credentials: true }));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ msg: "hello i am server" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
