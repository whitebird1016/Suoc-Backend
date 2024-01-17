import Tier from "../models/Tier.js";
import Mint from "../models/Mint.js";
import { drawSuocImage } from "../utils/draw.js";
import { GENERIC_ATTRIBUTES } from "../config/suoc-config.js";
import Suoc from "../models/SuocNFT.js";

const getCurrentTier = async () => {
    const tier = await Tier.findOne({ currentTier: true })
    return { isSuccess: true, data: tier, message: 'Successful!' }
}

const getTierInfo = async (tierName) => {
    const tier = await Tier.findOne({ name: tierName })
    return { isSuccess: true, data: tier, message: 'Successful!' }
}

const getAddressInfo = async (address) => {
    const result = await Mint.findOne({ address: address })
    return { isSuccess: true, data: result, message: 'Successful!' }
}

const createdNFT = async (address) => {
    const find = await Mint.findOne({ address: address })

    if (find) {
        await Mint.findOneAndUpdate({ address: address }, { minted: find.minted + 1, $inc: { availableForFree: -1 } })
    } else {
        await Mint.create({ address: address, minted: 1, availableForFree: 0 })
    }

    const currentTier = await Tier.findOne({ currentTier: true })
    await Tier.findOneAndUpdate({ name: currentTier.name }, { $inc: { totalMinted: 1 } })
    return { isSuccess: true, message: 'Successful minted!' }
}

const getSuocNFTMetadata = async (attrs) => {
    const { accessory, background, clothe, eye, hat, mouth, shell } = attrs;
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
        return {
            isSuccess: false,
            data: {
                mintable: false,
            },
            message: "Wrong nft attributes.",
        };
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
        return {
            isSuccess: false,
            data: {
                mintable: false,
            },
            message: "NFT with specified attributes are already minted.",
        };
    }

    const result = await drawSuocImage({
        accessory,
        background,
        clothe,
        eye,
        hat,
        mouth,
        shell,
    });

    return { isSuccess: true, data: result, message: 'Successful!' }
}

const getIsMintable = async (address, count, isWhiteList) => {
    const currentTier = await Tier.findOne({ currentTier: true })
    const account = await Mint.findOne({ address: address })

    const total = await Tier.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: '$totalMinted' }
            }
        }
    ])

    if (total[0].total >= 6000) {
        return { isSuccess: false, message: 'NFT mint count is exceeded' }
    }

    if (currentTier.name === 'tier1' || currentTier.name === 'tier2') {
        if (!isWhiteList) {
            return { isSuccess: false, message: 'Your account is not whitelist' }
        }
    }

    if (account) {
        if (account.minted >= currentTier.limitMintPerAccount) {
            return { isSuccess: false, message: 'Already you minted over limit count' }
        }

        if (account.availableForFree > 0) {
            return { isSuccess: true, data: { price: 0, freeCount: account.availableForFree }, message: 'Successful' }
        }
    }

    if (count === 5) {
        return { isSuccess: true, data: { price: currentTier.priceMultiple * count, freeCount: 0 }, message: 'Successful' }
    }

    return { isSuccess: true, data: { price: currentTier.price, freeCount: 0 }, message: 'Successful' }
}

const payForMint = async (address, count) => {
    const account = await Mint.findOne({ address: address })
    if (account) {
        await Mint.findOneAndUpdate({ address: address }, { $inc: { availableForFree: count } })
    } else {
        await Mint.create({ address: address, minted: 0, availableForFree: count })
    }

    return { isSuccess: true, message: 'Successful' }
}

export default {
    getCurrentTier,
    getTierInfo,
    getAddressInfo,
    createdNFT,
    getSuocNFTMetadata,
    getIsMintable,
    payForMint
}