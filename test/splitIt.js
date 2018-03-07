// `chai` is an assertion library. `expect` from chai is an
// assertion syntax
const  expect = require('chai').expect

// `artifacts.require()` creates an abstraction insterface object
// of a named contract compiled from the .sol files in the
// contracts folder
const SplitItCreator = artifacts.require("SplitItCreator");
const SplitIt = artifacts.require('SplitIt')

// globals
let splitItAddress = ''
const addresses = [
  '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
  '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
  '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
  '0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2',
]

// `contract` namespaces the test. First param is displayed on
// the outermost level of the test output. The call back is gets
contract('SplitItCreator', (accounts) => {

  // `it` also namespaces. Results (passed/failed) are displayed for
  // each instance of `it`
  it("should deploy and emit event", () => {


    return SplitItCreator.deployed().then(function(instance) {

      // remember to always return final statements from your
      // callback functions if they are asynchronous, otherwise
      // next steps will not wait

      return instance.createSplitIt(addresses, {from: accounts[0]})
      .then(res => {
        const newAddress = res.logs[0].args.contractAddress
        splitItAddress = newAddress
        expect(newAddress).to.exist()
        expect(newAddress).to.be.a('string')
        expect(newAddress).to.have.LengthOf(42)
      })
      .catch(err => console.log)
    })
  });


});

contract('SplitIt', (accounts) => {
  it('should contain expected splitee array of proper length', () => {
    console.log(splitItAddress)
    const instance = SplitIt.at(splitItAddress)
    return instance.getSpliteeCount.call({from: accounts[0]}).then(res => {
      console.log(res)
      const count = Number(res)
      expect(count).to.equal(addresses.length)
    })
  })

})
