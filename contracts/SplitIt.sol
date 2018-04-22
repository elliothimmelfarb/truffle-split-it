pragma solidity ^0.4.16;

contract SplitIt {

  address[] public receivingAddresses;
  uint totalReceived;
  mapping (address => uint) withdrawnAmounts;

  address constant public tippingAddress = 0x8142C51DB7e1807e64b11e54983F5b46FBB425dB;

  function SplitIt(address[] _receivingAddresses) payable public {
    receivingAddresses = _receivingAddresses;
    incrementTotalReceivedBy(msg.value);
  }

  function () payable public {
    incrementTotalReceivedBy(msg.value);
  }

  function incrementTotalReceivedBy(uint amount) internal {
    totalReceived += amount;
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

  function withdrawWithTip() canWithdraw payable public {

    withdraw();

    if (tipAmount > 0) {
      tippingAddress.transfer(tipAmount);
    }

  }

  function depositWithTip(uint tipAmount) payable public {

    if (tipAmount > 0) {
      uint incrementAmount = msg.value - tipAmount;
      tippingAddress.transfer(tipAmount);
      incrementTotalReceivedBy(incrementAmount);

    } else {
      incrementTotalReceivedBy(msg.value);

    }

  }

}

contract SplitItCreator {

  event Creation(SplitIt indexed contractAddress);

  address constant public tippingAddress = 0x8142C51DB7e1807e64b11e54983F5b46FBB425dB;

  function createSplitIt(address[] receivingAddresses, uint tipAmount) public payable {
    SplitIt splitIt = new SplitIt(receivingAddresses);
    emit Creation(splitIt);

    if (tipAmount > 0) {
      tippingAddress.transfer(tipAmount);
    }
  }

}
