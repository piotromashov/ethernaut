/*

//constructor
600A PUSH (value 0x0A/10dec) size of runtime code.
600c //PUSH (value 0x0c/12dec) offset size of constructor code, 12 bytes.
6000 //PUSH (value 0x00/0dec) destination memory offset
39	//CODECOPY (destination memory offset, offset in code, size)

600A //PUSH (value 10dec) 
6000 //PUSH (offset 0x00)
F3 	 //RETURN (offset, size)

//runtime code
602A //PUSH	(value 0x2A/42dec)
6080 //PUSH	(offset 0x80)
52   //MSTORE (offset, value)
6020 //PUSH (value 32dec) 
6080 //PUSH (offset 0x80)
F3 	 //RETURN (offset, size)

600A600c600039600A6000F3602A60805260206080F3
*/


const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MagicNumberHack", function () {

    let deployer;
    
    beforeEach(async function () {
        [deployer] = await ethers.getSigners();
    });
    
    it("Attack", async function () {        
        console.log("Deploying contract...");
        const tx = {
            data: "0x600A600c600039600A6000F3602A60805260206080F3"
        }
        let deployTx = await deployer.sendTransaction(tx);
        let result = await deployTx.wait();
        console.log(result);

        const tx2 = {
            to: result.contractAddress,
        }
        let magicNumber = await deployer.call(tx2);
        console.log(magicNumber);
        expect(parseInt(magicNumber,16)).to.be.equal(42);
  });

  afterEach(async function() {
  });

});
