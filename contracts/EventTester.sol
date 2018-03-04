pragma solidity ^0.4.4;

contract EventTester {

  event Created();
  event SaidHello();

  function () public {
    Created();
  }

  function sayHello() public {
    SaidHello();
  }
}
