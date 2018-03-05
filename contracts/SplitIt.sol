pragma solidity ^0.4.16;

contract SplitIt {

  address[] public employees;
  uint totalReceived;
  mapping (address => uint) withdrawnAmounts;

  function SplitIt(address[] _employees) payable public {
    employees = _employees;
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

  event Creation(address indexed contractAddress);

  function createSplitIt(address[] addresses) public
  returns (address contractAddress) {
    address splitIt = new SplitIt(addresses);
    Creation(splitIt);
    return splitIt;
  }

}
