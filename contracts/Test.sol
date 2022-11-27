// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Test {

	constructor() {
        console.log("Test: constructor() called");
    }

	function test(address a) public view returns (address) {
        console.log("Test: test() called, with parameter ", a);
        return a;
    }
}
