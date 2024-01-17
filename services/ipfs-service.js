import { NFTStorage } from "nft.storage";
import { IPFS_CONFIG } from "../config/ipfs.js";

/** NFT STORAGE SOLUTION */
export const getNFTStorageClient = () => {
  const client = new NFTStorage({ token: IPFS_CONFIG.NFT_STORAGE_KEY });
  return client;
};

export const saveDataToNFTStorage = async (data) => {
  const client = getNFTStorageClient();
  const savedData = await client.store(data);

  console.log(`Data Stored`, savedData);
  return savedData.ipnft;
};

export const saveFileToNFTStorage = async (file) => {
  const client = getNFTStorageClient();
  const savedFilePath = await client.storeBlob(file);

  return savedFilePath;
};
