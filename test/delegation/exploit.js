const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Delegation", function () {

  beforeEach(async function () {
    // Se deploya el contrato
  });

  it("Ataque", async function () {
    const DelegateHack = await ethers.getContractFactory("DelegateHack");
    await DelegateHack.deploy();
  });

  afterEach(async function() {
    // COMPLETAR
  });
});
