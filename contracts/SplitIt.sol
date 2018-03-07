pragma solidity ^0.4.16;

contract SplitIt {

  address[] public employees;
  uint totalReceived;
  mapping (address => uint) withdrawnAmounts;

  function SplitIt(address[] _employees) payable public {
    for(uint8 index = 0; index < _employees.length; index++) {
      employees.push(_employees[index]);
    }
    updateTotalReceived();
  }

  function () payable public {
    updateTotalReceived();
  }

  function updateTotalReceived() internal {
    totalReceived += msg.value;
  }

  modifier canWithdraw() {

    bool contains = false;

    for(uint i = 0; i < employees.length; i++) {
      if (employees[i] == msg.sender) {
        contains = true;
      }
    }

    require(contains);
    _;

  }

  function withdraw() canWithdraw public {

    uint amountAllocated = totalReceived/employees.length;
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

  function createSplitIt(address[] addresses) public {
    SplitIt splitIt = new SplitIt(addresses);
    Creation(splitIt);
  }

}
