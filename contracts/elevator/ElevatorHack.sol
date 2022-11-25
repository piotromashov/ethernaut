// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
  function goTo(uint) external;
}


contract Building {
  bool flag = true;

  function isLastFloor(uint _floor) external returns (bool){
    if(flag){
      flag = false;
      return false;
    }
    return true;
  }

  function runElevator(address elevator) public {
      IElevator elevator = IElevator(elevator);
      elevator.goTo(0);
  }
}