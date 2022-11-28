const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GatekeeperOneHack", function () {

    let deployer;
    
    beforeEach(async function () {
        [deployer] = await ethers.getSigners();
        // const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne");
        // this.gatekeeperOne = await GatekeeperOne.deploy();
        // target_address = this.gatekeeperOne.address;
        target_address = "0x717B281f588A7a377F1cc876eFBeEB951Ab99986";
        console.log("GatekeeperOne deployed to: "+target_address);
        this.gatekeeperOne = await ethers.getContractAt("GatekeeperOne", target_address);

    });
    
    it("Attack", async function () {
        const gatekeeperOneAddress = this.gatekeeperOne.address;

        //check value of entrant to be empty
        let entrant = await this.gatekeeperOne.entrant();
        console.log("Entrant address: ", entrant);
        expect(entrant).to.equal('0x0000000000000000000000000000000000000000');
        
        //execute hack
        console.log("Deploying GatekeeperOneHack contract");
        const GatekeeperOneHack = await ethers.getContractFactory("GatekeeperOneHack");
        const gatekeeperOneHack = await GatekeeperOneHack.deploy();
        console.log("Deployed GatekeeperOneHack to: "+gatekeeperOneHack.address);
        
        console.log("Executing hack...");
        const tx = await gatekeeperOneHack.hack(gatekeeperOneAddress);
        await tx.wait(1);
        console.log("Finished");

        //expect value of entrant to be my address
        entrant = await this.gatekeeperOne.entrant();
        console.log("Entrant address: ", entrant);
        expect(entrant).to.equal(deployer.address);
  });

  afterEach(async function() {
  });

});
