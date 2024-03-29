require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");

const { api_key, private_key } = require('./secrets.json');

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.8.12" }, { version: "0.6.0" }, { version: "0.5.0" }],
    overrides: {
      "contracts/token/Token.sol": {
        version: "0.6.0",
      },
      "contracts/delegation/DelegateHack.sol": {
        version: "0.6.0",
      },
      "contracts/telephone.sol": {
        version: "0.6.0",
      },
      "contracts/AlienCodex.sol": {
        version: "0.5.0",
      }
    }
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${api_key}`,
      accounts: [private_key]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  mocha: {
    timeout: 400000
  }
}