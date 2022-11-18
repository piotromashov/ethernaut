require("@nomiclabs/hardhat-waffle");

const { url, private_key } = require('./secrets.json');

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.0" }],
    overrides: {
      "contracts/delegation/DelegateHack.sol": {
        version: "0.6.0",
      },
      "contracts/telephone.sol": {
        version: "0.6.0",
      }
    }
  },
  networks: {
    goerli: {
      url: url,
      accounts: [private_key]
    }    
  }
}