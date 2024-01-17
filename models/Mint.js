import mongoose from "mongoose";

const MintSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  minted: {
    type: Number,
    default: 0
  },
  availableForFree: {
    type: Number,
  }
});

export default mongoose.model("suoc_mints", MintSchema);
