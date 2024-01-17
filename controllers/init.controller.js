import Tier from "../models/Tier.js";

const init = async (req, res, next) => {
    try {
        await Tier.deleteMany({})
        await Tier.insertMany([
            {
                name: "tier1",
                price: 1,
                priceMultiple: 0.8,
                currentTier: true,
                totalMinted: 0,
                limitMintPerAccount: 5
            },
            {
                name: "tier2",
                price: 2,
                priceMultiple: 1.5,
                currentTier: true,
                totalMinted: 0,
                limitMintPerAccount: 10
            },
            {
                name: "public",
                price: 5,
                priceMultiple: 4,
                currentTier: true,
                totalMinted: 0,
                limitMintPerAccount: 6000
            },
        ])
        res.status(200).send('successful init');
    } catch (error) {
        next(error)
    }
}

export default {
    init
}