const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Testing", function () {
	let deployer;
	let testContract; 
	
	beforeEach(async function () {
		[deployer] = await ethers.getSigners();

		const Test = await ethers.getContractFactory("Test");
		console.log("Deploying w/ address ", deployer.address);
		testContract = await Test.deploy();
		console.log("Deployed Test into address: "+testContract.address);
	});
	
	it("Returns value correctly", async function () {		
		console.log("Executing test method with parameter: ", deployer.address);
		let address = await testContract.test(deployer.address);
		console.log("Returned address: ", address);
		expect(address).to.equal(deployer.address);
		console.log("Finished test method");
	});

	it("Test assembly caller on internal caller", async function() {
		console.log("Executing caller call");
		let internalCallerTx = await testContract.testInternalCaller();
		await internalCallerTx.wait();

		address = await testContract.caller();
		console.log(address);
		expect(address).to.equal(testContract.address);
		console.log("Finished test method");
	});

	it("Test extcodesize call on Contract should have length", async function() {
		console.log("Executing extcodesize call on Contract");
		let internalCallerTx = await testContract.testCodeSizeByContract();
		await internalCallerTx.wait();

		codeSize = await testContract.codeSize();
		expect(codeSize.toNumber()).to.be.greaterThan(0);
	});

	it("Test extcodesize call on EOA should be 0", async function() {
		console.log("Executing extcodesize call on EOA");

		let internalCallerTx = await testContract.testCodeSizeByEOA();
		await internalCallerTx.wait();

		codeSize = await testContract.codeSize();
		expect(codeSize.toNumber()).to.equal(0);
	});
	
	afterEach(async function() {
		// COMPLETAR
	});
	
});
