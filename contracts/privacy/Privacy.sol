/* 
The creator of this contract was careful enough to protect the sensitive areas of its storage.

Unlock this contract to beat the level.

Things that might help:

    Understanding how storage works
    Understanding how parameter parsing works
    Understanding how casting works

Tips:

    Remember that metamask is just a commodity. Use another tool if it is presenting problems. 
    Advanced gameplay could involve using remix, or your own web3 provider
*/     

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {

  bool public locked = true; //                             index 0: size 256 bits - content 0x0000000000000000000000000000000000000000000000000000000000000001
  uint256 public ID = block.timestamp;  //                  index 1: size 256 bits - content dynamic
  uint8 private flattening = 10;    //                      index 2: size 8 bits   - content 0x0a | 256bits - 8bits = 248bits left
  uint8 private denomination = 255;                 //      index 2: size 8 bits   - content 0xff | 248bits - 8bits = 240bits left
  uint16 private awkwardness = uint16(block.timestamp);//   index 2: size 16 bits  - content 0x?? | 240bits - 16bits = 224bits left
  bytes32[3] private data; //                               index 3: size 256 bits - content data[0]
                            //                              index 4: size 256 bits - content data[1]
                            //                              index 5: size 256 bits - content data[2]
  constructor(bytes32[3] memory _data) {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));                  //  the key is on the first 128 bits(16 bytes) of data[2], which is on memory index 5(size 256 bits)
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
