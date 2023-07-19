// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./Ownable.sol";

contract AlienCodex is Ownable {

  bool public contact;
  bytes32[] public codex;

  modifier contacted() {
    assert(contact);
    _;
  }
  
  function makeContact() public {
    contact = true;
  }

  function record(bytes32 _content) contacted public {
    codex.push(_content);
  }

  function getStorageSlot(uint index) public view returns (uint content) {
    assembly {
        content := sload(index)
    }
  }

  function gethashOfBucket(uint index) public pure returns (uint hashVal) {
    return uint(keccak256(abi.encode(index)));
  }

  function getlength() public view returns(uint) {
    return codex.length;
  }

  function retract() contacted public {
    codex.length--;
  }

  function revise(uint i, bytes32 _content) contacted public {
    codex[i] = _content;
  }
}