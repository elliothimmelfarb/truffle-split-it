pragma solidity ^0.4.16;
contract SplitIt {

  address[] employees;
  uint totalReceived;
  mapping (address => uint) withdrawnAmounts;

  event FirstAddress(address indexed firstAddress);

  function SplitIt(address[] _employees) payable public {
    employees = _employees;

    if (_employees.length > 0) {
      FirstAddress(_employees[0]);
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

  event Creation(SplitIt indexed splitItContract);

  function createSplitIt(address[] addresses) public
  returns (SplitIt contractAddress) {
    SplitIt splitIt = new SplitIt(addresses);
    Creation(splitIt);
    return splitIt;
  }

}
