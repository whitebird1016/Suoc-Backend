import express from "express";
import fs from "fs";
import { GENERIC_ATTRIBUTES } from "../config/suoc-config.js";
import Suoc from "../models/SuocNFT.js";
import dotenv from "dotenv";
import { createCanvas, loadImage } from "canvas";
import { generateString } from "../utils/string.js";

dotenv.config();
const router = express.Router();

const dir = {
  source: `../attributes`,
  outputs: `../outputs`,
};

const imageFormat = {
  width: 500,
  height: 500,
};

const canvas = createCanvas(imageFormat.width, imageFormat.height);
const ctx = canvas.getContext("2d");

router.post("/getSuocNFTMetadata", async (req, res) => {
  try {
    const { accessory, background, clothe, eye, hat, mouth, shell } = req.body;
    const foundAccessory = GENERIC_ATTRIBUTES.accessory.filter(
      (e) => accessory === e
    );
    const foundBackground = GENERIC_ATTRIBUTES.background.filter(
      (e) => background === e
    );
    const foundClothe = GENERIC_ATTRIBUTES.clothe.filter((e) => clothe === e);
    const foundEye = GENERIC_ATTRIBUTES.eye.filter((e) => eye === e);
    const foundHat = GENERIC_ATTRIBUTES.hat.filter((e) => hat === e);
    const foundMouth = GENERIC_ATTRIBUTES.mouth.filter((e) => mouth === e);
    const foundShell = GENERIC_ATTRIBUTES.shell.filter((e) => shell === e);
    if (
      foundAccessory.length === 0 ||
      foundBackground.length === 0 ||
      foundClothe.length === 0 ||
      foundEye.length === 0 ||
      foundHat.length === 0 ||
      foundMouth.length === 0 ||
      foundShell.length === 0
    ) {
      return res.status(500).json({
        mintable: false,
        message: "Wrong nft attributes.",
      });
    }
    const isExistingNFT = await Suoc.findOne({
      accessory,
      background,
      clothe,
      eye,
      hat,
      mouth,
      shell,
    });
    if (isExistingNFT) {
      return res.status(500).json({
        mintable: false,
        message: "NFT with specified attributes are already minted.",
      });
    }
    const result = drawSuocImage({
      accessory,
      background,
      clothe,
      eye,
      hat,
      mouth,
      shell,
    });
    console.log({ result });
  } catch (err) {
    console.log(err);
  }
});

const drawSuocImage = async (properties) => {
  const fileName =
    generateString(6) + "-" + generateString(6) + "-" + generateString(6);
  const backgroundIm = await loadImage(
    `${dir.source}/Suoc/Backgrounds/${properties.background}`
  );
  const accessoryIm = await loadImage(
    `${dir.source}/Suoc/Accessories/${properties.accessory}`
  );
  const clotheIm = await loadImage(
    `${dir.source}/Suoc/Clothes/${properties.clothe}`
  );
  const eyeIm = await loadImage(`${dir.source}/Suoc/Eyes/${properties.eye}`);
  const hatIm = await loadImage(`${dir.source}/Suoc/Hats/${properties.hat}`);
  const mouthIm = await loadImage(
    `${dir.source}/Suoc/Mouth/${properties.mouth}`
  );
  const shellIm = await loadImage(
    `${dir.source}/Suoc/Shells/${properties.shell}`
  );

  ctx.drawImage(backgroundIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(shellIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(eyeIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(mouthIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(clotheIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(hatIm, 0, 0, imageFormat.width, imageFormat.height);
  ctx.drawImage(accessoryIm, 0, 0, imageFormat.width, imageFormat.height);

  fs.writeFileSync(
    `${dir.outputs}/suoc/${fileName}.png`,
    canvas.toBuffer("image/png")
  );

  return `${fileName}.png`;
};

export default router;
