import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
