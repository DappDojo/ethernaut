# Ethernaut

[The Ethernaut](https://ethernaut.openzeppelin.com/) is a Web3/Solidity based wargame inspired by overthewire.org, played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'. The game is 100% open source and all levels are contributions made by other players. 

In this repo you can find my solutions to the challenges:

### 01. **Fallback**
This level is about the use and implementation of the fallback function. You need to claim ownership of the contract and reduce its balance to zero.

### 02. **Fal1Out**
In this challenge you have to discover a very tiny mistake (or a typo) and show its terrible consequences. 

### 03. **Coin Flip**
To complete this level you'll need to guess the correct outcome 10 times in a row. The goal of this level is to show how tricky random number generation is in Blockchain systems.

### 04. **Telephone**
To complete this level you need to claim ownership of the contract by taking advantage of a bad implementation of the global variables: *tx.origin* and *msg.sender*.

### 05. **Token**
You beat this level if you somehow manage to get your hands on any additional tokens. This is an example of Overflow/Underflow issues when an integer is incremented beyond its maximum value or decremented below its minimum value.

### 06. **Delegation**
The goal of this level is for you to claim ownership of the instance you are given. To succeed you need to understand how *delegatecall* low level function works, how it can be used to delegate operations to on-chain libraries, and what implications it has on execution scope.

### 07. **Force**
The goal of this level is to make the balance of the contract greater than zero. To break this challenge you need to understand that nothing prevents a contract from receiving ether from a contract that is self destructed.

### 08. **Vault**
In this level you need to get the value of an on-chain private variable to unlock the vault and  pass this level.

### 09. **King**
In this challenge, you need to understand the consequences of not verifying that a transfer was successfully executed.

### 10. **Re-entrancy**
The goal of this level is for you to steal all funds from the contract by launching a re-entrancy attack. To do this you need to exploit a vulnerability in function withdraw. 

### 11. **Elevator**
In this challenge the attacker implements its own version of a function declared within an interface. This function is not implemented and the interface is using the 'default' modifier which allows to change the blockchain state. Never trust an external contract call.
