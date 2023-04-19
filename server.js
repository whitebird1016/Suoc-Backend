import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import path from "path";

/* App Config */
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 80;
// const buildPath = path.join(__dirname, "build");

dotenv.config();

/* Middleware -> Deals the Connections between database and the App */
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* Socket.io Setup */
app.use(express.urlencoded({ extended: true }));

/* API Routes -> The first part is the default path for all the requests in that users.js file there we have to continue from this path */
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch(() => {
    console.log("err");
  });
/* Port Listening In */

// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
