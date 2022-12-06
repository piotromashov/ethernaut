// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract TestInternalCaller {

    uint saraza;

	constructor() {
        console.log("TestInternalCaller#constructor: called");
    }

    function testCaller() public view returns(address) {
        console.log("TestInternalCaller#testCaller: called");
		address x;
		assembly { x := caller() }
        console.log("TestInternalCaller#testCaller: result", x);
        return x;
	}

    function testExtCodeSize() public view returns(uint) {
        console.log("TestInternalCaller#testExtCodeSize: called");
		uint x;
		assembly { x := extcodesize(caller()) }
        console.log("TestInternalCaller#testExtCodeSize: result", x);
        return x;
    }

    function testDelegatecallStorage(uint _value) public returns(uint) {
        console.log("TestInternalCaller#testDelegatecallStorage: called");
        saraza = _value;
        return saraza;
    }
}
