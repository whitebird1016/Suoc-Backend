import pinataSDK from '@pinata/sdk';
import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import path from "path";
import { fileURLToPath } from "url";
import { generateString } from "../utils/string.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

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

export const drawSuocImage = async (properties) => {
    const fileName =
        generateString(6) + "-" + generateString(6) + "-" + generateString(6);
    const backgroundIm = await loadImage(
        path.resolve(
            __dirname,
            `${dir.source}/Suoc/Backgrounds/${properties.background}.png`
        )
    );
    const accessoryIm = await loadImage(
        path.resolve(
            __dirname,
            `${dir.source}/Suoc/Accessories/${properties.accessory}.png`
        )
    );
    const clotheIm = await loadImage(
        path.resolve(
            __dirname,
            `${dir.source}/Suoc/Clothes/${properties.clothe}.png`
        )
    );
    const eyeIm = await loadImage(
        path.resolve(__dirname, `${dir.source}/Suoc/Eyes/${properties.eye}.png`)
    );
    const hatIm = await loadImage(
        path.resolve(__dirname, `${dir.source}/Suoc/Hats/${properties.hat}.png`)
    );
    const mouthIm = await loadImage(
        path.resolve(__dirname, `${dir.source}/Suoc/Mouth/${properties.mouth}.png`)
    );
    const shellIm = await loadImage(
        path.resolve(__dirname, `${dir.source}/Suoc/Shells/${properties.shell}.png`)
    );

    ctx.drawImage(backgroundIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(shellIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(clotheIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(accessoryIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(hatIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(eyeIm, 0, 0, imageFormat.width, imageFormat.height);
    ctx.drawImage(mouthIm, 0, 0, imageFormat.width, imageFormat.height);

    fs.writeFileSync(
        path.resolve(__dirname, `${dir.outputs}/suoc/${fileName}.png`),
        canvas.toBuffer("image/png")
    );

    // const imageFileData = fs.readFileSync(
    //   path.resolve(__dirname, `${dir.outputs}/suoc/${fileName}.png`)
    // );

    // const imageFile = new File([imageFileData], `${fileName}.png`, {
    //   type: `image/png`,
    // });

    // const savedFilePath = await saveFileToNFTStorage(imageFile);
    // console.log("savedFilePath =>", savedFilePath)

    const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

    const stream = fs.createReadStream(path.resolve(__dirname, `${dir.outputs}/suoc/${fileName}.png`));
    const res = await pinata.pinFileToIPFS(stream, { pinataMetadata: { name: `${fileName}.png` } })

    const metadata = {
        name: "SUOC",
        symbol: "",
        description: "A collection of 10,000 of the most degenerate gods in the universe.",
        seller_fee_basis_points: 2900,
        image: `https://ipfs.io/ipfs/${res.IpfsHash}`,
        external_url: "https://degods.com",
        attributes: [
            {
                trait_type: "background",
                value: properties.background
            },
            {
                trait_type: "skin",
                value: properties.shell
            },
            {
                trait_type: "clothe",
                value: properties.clothe
            },
            {
                trait_type: "hat",
                value: properties.hat
            },
            {
                trait_type: "eye",
                value: properties.eye
            },
            {
                trait_type: "mouth",
                value: properties.mouth
            },
            {
                trait_type: "accessory",
                value: properties.accessory
            }
        ]
    }

    const { IpfsHash } = await pinata.pinJSONToIPFS(metadata)
    console.log("savedMetaDataPath => ", IpfsHash)

    return IpfsHash;
};