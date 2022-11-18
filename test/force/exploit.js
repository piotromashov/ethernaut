const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Force", function () {

  beforeEach(async function () {
    // Se deploya el contrato
  });

  it("Ataque", async function () {
    const ForceHack = await ethers.getContractFactory("ForceHack");
    let forceHack = await ForceHack.deploy();
    await forceHack.deposit({value: 1});
    console.log(forceHack.address);
    await forceHack.hack("0x04D2f3464CFe904a95F03113181b44a485858fFD");
  });

  afterEach(async function() {
    // COMPLETAR
  });

});
