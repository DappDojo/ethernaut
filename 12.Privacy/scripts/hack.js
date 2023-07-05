const {ethers} = require("hardhat");
const { Network, Alchemy } = require("alchemy-sdk");

async function main() {
  
  require("dotenv").config();
  const { SEPOLIA_URL, PRIVATE_KEY } = process.env;
  const contractAddress = "0xF38Ff6883384ED308b76FADa6d034C0F242C8A26";


// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const result = await alchemy.core.getStorageAt(contractAddress, 5);

console.log(result);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
