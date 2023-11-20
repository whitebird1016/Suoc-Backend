import mongoose from "mongoose";

const SuocNFTSchema = new mongoose.Schema({
  accessory: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  clothe: {
    type: String,
    required: true,
  },
  eye: {
    type: String,
    required: true,
  },
  hat: {
    type: String,
    required: true,
  },
  mouth: {
    type: String,
    required: true,
  },
  shell: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Suoc", SuocNFTSchema);
