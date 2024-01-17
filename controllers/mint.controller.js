import mintService from '../services/mint.service.js'

const getSuocNFTMetadata = async (req, res, next) => {
    try {
        const result = await mintService.getSuocNFTMetadata(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getCurrentTier = async (req, res, next) => {
    try {
        const result = await mintService.getCurrentTier();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getTierInfo = async (req, res, next) => {
    try {
        const result = await mintService.getTierInfo(req.body.tierName);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getAddressInfo = async (req, res, next) => {
    try {
        const result = await mintService.getAddressInfo(req.body.address);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const createdNFT = async (req, res, next) => {
    try {
        const result = await mintService.createdNFT(req.body.address);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getIsMintable = async (req, res, next) => {
    try {
        const { address, count, isWhiteList } = req.body;
        const result = await mintService.getIsMintable(address, count, isWhiteList);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const payForMint = async (req, res, next) => {
    try {
        const result = await mintService.payForMint(req.body.address, req.body.count);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
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