import express from "express";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/addaddress", async (req, res) => {
  try {
    if (req.body.address == "") {
      return res.status(400).json("empty");
    } else {
      const user = await User.findOne({ address: req.body.address });
      if (user) {
        return res.status(400).json("Already Exist");
      } else {
        const userall = await User.find();
        const id = userall.length + 1;
        const newUser = new User({
          id: id,
          address: req.body.address,
        });
        newUser.save().then(() => res.status(200).json("Success"));
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
