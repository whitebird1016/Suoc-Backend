import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.route.js";
import mintRoutes from "./routes/mint.route.js";
import initRoute from "./routes/init.route.js";

/* App Config */

const app = express();
const port = process.env.PORT;

dotenv.config();

/* Middleware -> Deals the Connections between database and the App */
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* Socket.io Setup */
app.use(express.urlencoded({ extended: true }));

/* API Routes -> The first part is the default path for all the requests in that users.js file there we have to continue from this path */
app.use("/api/users", userRoutes);
app.use("/api/mint", mintRoutes);
app.use("/api", initRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch(() => {
    console.log("err");
  });
/* Port Listening In */

app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
