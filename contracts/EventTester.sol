pragma solidity ^0.4.4;

contract EventTester {

  event Created();
  event SaidHello();

  function () public {
    emit Created();
  }

  function sayHello() public {
    emit SaidHello();
  }
}
