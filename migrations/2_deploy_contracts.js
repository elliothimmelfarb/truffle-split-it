const EventTester = artifacts.require("EventTester");
const SplitItCreator = artifacts.require("SplitItCreator");


module.exports = function(deployer) {
  deployer.deploy(EventTester);
  deployer.deploy(SplitItCreator);
};
