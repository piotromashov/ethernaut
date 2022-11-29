const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GatekeeperTwoHack", function () {

    let deployer;
    let contract;
    
    beforeEach(async function () {
        [deployer] = await ethers.getSigners();
        // const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo");
        // console.log("Deploying with address ", deployer.address);
        // contract = await GatekeeperTwo.deploy();
        target_address = "0x521aE3920D46787D2A1171027a6Eb994ecaA6bb5";
        // target_address = contract.address;
        contract = await ethers.getContractAt("GatekeeperTwo", target_address);
        // console.log("GatekeeperTwo deployed to: "+target_address);
    });
    
    it("Attack", async function () {
        //check value of entrant to be empty
        let entrant = await contract.entrant();
        console.log("Entrant address: ", entrant);
        expect(entrant).to.equal('0x0000000000000000000000000000000000000000');
        
        //execute hack
        console.log("Executing hack...");
        console.log("Deploying GatekeeperTwoHack contract");
        const GatekeeperTwoHack = await ethers.getContractFactory("GatekeeperTwoHack");
        const gatekeeperTwoHack = await GatekeeperTwoHack.deploy(contract.address);
        console.log("Deployed GatekeeperTwoHack to: "+gatekeeperTwoHack.address);
        console.log("Finished");

        //expect value of entrant to be my address
        entrant = await contract.entrant();
        console.log("Entrant address: ", entrant);
        expect(entrant).to.equal(deployer.address);
  });

  afterEach(async function() {
  });

});
