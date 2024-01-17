import mongoose from "mongoose";

const TierSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  priceMultiple: {
    type: Number,
  },
  currentTier: {
    type: Boolean,
    default: false
  },
  totalMinted: {
    type: Number,
  },
  limitMintPerAccount: {
    type: Number
  }
});

export default mongoose.model("tiers", TierSchema);
