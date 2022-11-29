// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./TestInternalCaller.sol";

contract Test {

    address public caller;
    uint public codeSize;

	constructor() {
        console.log("Test#testCodeSizeByConstructor: called");
        testCodeSizeByContract();
    }

	function test(address a) public view returns (address) {
        console.log("Test#test: called, ", a);
        return a;
    }

    function testInternalCaller() public returns(address){
        console.log("Test#testInternalCaller: called");
        TestInternalCaller testInternalCaller = new TestInternalCaller();
        console.log("Test#testInternalCaller: calling TestInternalCaller#testCaller");
        caller = testInternalCaller.testCaller();
        console.log("Test#testInternalCaller: result ", caller);
        return caller;
    }

    function testCodeSizeByContract() public returns(address){
        console.log("Test#testCodeSizeByContract: called");
        TestInternalCaller testInternalCaller = new TestInternalCaller();
        console.log("Test#testCodeSizeByContract: calling TestInternalCaller#testExtCodeSize");
        codeSize = testInternalCaller.testExtCodeSize();
        console.log("Test#testCodeSizeByContract: result ", codeSize);
        return caller;
    }

    function testCodeSizeByEOA() public returns(uint) {
        console.log("Test#testCodeSizeByEOA: called");
        uint x;
		assembly { x := extcodesize(caller()) }
        codeSize = x;
        console.log("Test#testCodeSizeByEOA: result", codeSize);
        return codeSize;
    }
}
