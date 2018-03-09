pragma solidity ^0.4.16;

contract SplitIt {

  address[] public receivingAddresses;
  uint totalReceived;
  mapping (address => uint) withdrawnAmounts;

  function SplitIt(address[] _receivingAddresses) payable public {
    receivingAddresses = _receivingAddresses;
    updateTotalReceived();
  }

  function () payable public {
    updateTotalReceived();
  }

  function updateTotalReceived() internal {
    totalReceived += msg.value;
  }

  function numberOfReceivingAddresses() public constant
  returns(uint count) {
    return receivingAddresses.length;
  }

  modifier canWithdraw() {
    bool contains = false;

    for(uint i = 0; i < receivingAddresses.length; i++) {
      if (receivingAddresses[i] == msg.sender) {
        contains = true;
      }
    }

    require(contains);
    _;
  }

  function withdraw() canWithdraw public {

    uint amountAllocated = totalReceived/receivingAddresses.length;
    uint amountWithdrawn = withdrawnAmounts[msg.sender];
    uint amount = amountAllocated - amountWithdrawn;
    withdrawnAmounts[msg.sender] = amountWithdrawn + amount;

    if (amount > 0) {
      msg.sender.transfer(amount);
    }

  }

}

contract SplitItCreator {

  event Creation(SplitIt indexed contractAddress);

  function createSplitIt(address[] receivingAddresses) public {
    SplitIt splitIt = new SplitIt(receivingAddresses);
    Creation(splitIt);
  }

}
