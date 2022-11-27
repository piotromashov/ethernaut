const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Testing", function () {
	let deployer;
	let testContract; 
	
	beforeEach(async function () {
		[deployer] = await ethers.getSigners();

		const Test = await ethers.getContractFactory("Test");
		console.log("Deploying...");
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
	
	afterEach(async function() {
		// COMPLETAR
	});
	
});
