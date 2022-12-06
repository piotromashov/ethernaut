// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./TestInternalCaller.sol";

contract Test {

    address public caller;
    uint public codeSize;

    bytes4 constant testDelegatecallStorageSignature = bytes4(keccak256("testDelegatecallStorage(uint256)"));

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

    function testDelegatecallStorage(uint _value) public returns(bytes memory) {
        console.log("Test#testDelegatecallStorage: called");
        TestInternalCaller testInternalCaller = new TestInternalCaller();
        console.log("Test#testDelegatecallStorage: calling TestInternalCaller#testDelegatecallStorage");
        (bool success, bytes memory data) = address(testInternalCaller).delegatecall(abi.encodePacked(testDelegatecallStorageSignature, _value));
        console.log("Test#testDelegatecallStorage: result", success);
        return data;
    }
}
