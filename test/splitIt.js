// `chai` is an assertion library. `expect` from chai is an
// assertion syntax
const  expect = require('chai').expect

// `artifacts.require()` creates an abstraction insterface object
// of a named contract compiled from the .sol files in the
// contracts folder
var SplitIt = artifacts.require("SplitItCreator");

// `contract` namespaces the test. First param is displayed on
// the outermost level of the test output. The call back is gets
contract('SplitIt', function(accounts) {

  let splitItAddress = ''
  const addresses = [
    '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
    '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
    '0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2',
  ]

  // `it` also namespaces. Results (passed/failed) are displayed for
  // each instance of `it`
  it("it should deploy from the creator", function() {


    return SplitIt.deployed().then(function(instance) {

      // remember to always return from your callback functions if
      // they are asynchronous

      return instance.createSplitIt(addresses, {from: accounts[0]})
      .then(res => {
        const newAddress = res.logs[0].args.contractAddress
        console.log(newAddress)
        splitItAddress = newAddress
        expect(newAddress).to.exist()
        expect(newAddress).to.be.a('string')
        expect(newAddress.length).to.be.above(0)
      })
      .catch(err => console.log)
    })
  });

});
