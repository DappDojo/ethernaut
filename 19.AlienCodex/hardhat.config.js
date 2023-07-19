require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
const { SEPOLIA_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.5.17",
  networks: {
  sepolia: {
      url: SEPOLIA_URL || "",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gasPrice: 3000000000,
      gas: 2100000
    }
  }
};