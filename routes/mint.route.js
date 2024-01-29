import express from "express";
import dotenv from "dotenv";
import mintController from "../controllers/mint.controller.js";

dotenv.config();
const router = express.Router();

router.post("/getSuocNFTMetadata", mintController.getSuocNFTMetadata);

router.get("/getCurrentTier", mintController.getCurrentTier);

router.post("/getTierInfo", mintController.getTierInfo);

router.post("/getAddressInfo", mintController.getAddressInfo);

router.post("/createdNFT", mintController.createdNFT);

router.post("/getIsMintable", mintController.getIsMintable);
router.post("/payForMint", mintController.payForMint);

export default router;
