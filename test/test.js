const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Testing", function () {
	let deployer;  
	
	beforeEach(async function () {
		[deployer] = await ethers.getSigners();
	});
	
	it("Console log correctly into network", async function () {
		const Test = await ethers.getContractFactory("Test");
		console.log("Deploying...");
		const test = await Test.deploy();
		console.log("Deployed Test into address: "+test.address);
		console.log("Executing test method with parameter: ", deployer.address);
		await test.test(deployer.address);
		console.log("Finished test method");
	});
	
	afterEach(async function() {
		// COMPLETAR
	});
	
});
