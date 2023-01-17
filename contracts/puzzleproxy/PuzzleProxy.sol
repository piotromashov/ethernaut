// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

// proxy contract has the storage layout of the implementation contract
contract PuzzleProxy is TransparentUpgradeableProxy {
    address public pendingAdmin;    // slot 0 of storage
    address public override admin;  // slot 1 of storage

    constructor(address _admin, address _implementation, bytes memory _initData) TransparentUpgradeableProxy(_implementation, _admin, _initData) {
        admin = _admin;
    }

    modifier onlyAdmin {
      require(msg.sender == admin, "Caller is not the admin");
      _;
    }

    // i can propose new admin, this will impact when calling via delegate call, the owner of puzzlewallet will be the one proposed here.
    function proposeNewAdmin(address _newAdmin) external {
        pendingAdmin = _newAdmin;
    }

    function approveNewAdmin(address _expectedAdmin) external onlyAdmin {
        require(pendingAdmin == _expectedAdmin, "Expected new admin by the current admin is not the pending admin");
        admin = pendingAdmin;
    }

    function upgradeTo(address _newImplementation) external override onlyAdmin {
        _upgradeTo(_newImplementation);
    }
}

// storage layout of the implementation contract, not matching the same as the proxy contract
contract PuzzleWallet {
    address public owner;   // changing the slot 0 of storage
    uint256 public maxBalance;  // slot 1 of storage, matches with the slot 1 of proxy, which is the admin, uint256(player.address)
    mapping(address => bool) public whitelisted;
    mapping(address => uint256) public balances;

    function init(uint256 _maxBalance) public {
        require(maxBalance == 0, "Already initialized");    //if I get the maxBalance to be zero, I can call this function again and again
        maxBalance = _maxBalance;
        owner = msg.sender;
    }

    modifier onlyWhitelisted {
        require(whitelisted[msg.sender], "Not whitelisted");    // only whitelisted addresses can call the functions
        _;
    }

    function setMaxBalance(uint256 _maxBalance) external onlyWhitelisted {
      require(address(this).balance == 0, "Contract balance is not 0"); // if contract balance zero I can change the maxBalance, contract starts with 0.001 ether.
      maxBalance = _maxBalance;
    }

    function addToWhitelist(address addr) external {
        require(msg.sender == owner, "Not the owner");  // if i have ownership i can add new whitelisted addresses
        whitelisted[addr] = true;
    }

    function deposit() external payable onlyWhitelisted {
      require(address(this).balance <= maxBalance, "Max balance reached");
      balances[msg.sender] += msg.value;    // I can deposit more than maxBalance, but i only can take out the deposited amounts on my account later.
    }

    // applies well the pattern checks->effects->interactions
    function execute(address to, uint256 value, bytes calldata data) external payable onlyWhitelisted {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] -= value;
        (bool success, ) = to.call{ value: value }(data);
        require(success, "Execution failed");
    }

    function multicall(bytes[] calldata data) external payable onlyWhitelisted {
        bool depositCalled = false;
        for (uint256 i = 0; i < data.length; i++) {
            bytes memory _data = data[i];
            bytes4 selector;
            assembly {
                selector := mload(add(_data, 32))   // The length of a dynamic array is stored at the first slot of the array and followed by the array elements.
            }
            if (selector == this.deposit.selector) {
                require(!depositCalled, "Deposit can only be called once");
                // Protect against reusing msg.value
                depositCalled = true;
            }
            (bool success, ) = address(this).delegatecall(data[i]);
            require(success, "Error while delegating call");
        }
    }
}