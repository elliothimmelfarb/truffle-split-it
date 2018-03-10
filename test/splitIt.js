// To run tests against our solidity code after merge to master:
// 1. pull master branch
// 2. npm install (only first time after merge)
// 3. run Ganache
// 4. run `truffle test`

// `chai` is an assertion library. `expect` from chai is an
// assertion syntax style
const  expect = require('chai').expect

// `artifacts.require()` creates an abstraction insterface object
// of a named contract compiled from the .sol files in the
// contracts folder of this project
const SplitItCreator = artifacts.require('SplitItCreator');
const SplitIt = artifacts.require('SplitIt')

const addresses = [
  '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
  '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
  '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
  '0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2',
]

// `contract` namespaces the test. The first param is displayed on
// the outermost level of the test output. The callback gets the accounts
// array
contract('SplitItCreator', async (accounts) => {

  // `it` also namespaces. Results (passed/failed) are displayed for
  // each instance of `it`
  it('should emit event with new SplitIt address during creation', async () => {
    const instance = await SplitItCreator.deployed()
    const res = await instance.createSplitIt(addresses, {from: accounts[0]})
    const newAddress = res.logs[0].args.contractAddress
    expect(newAddress).to.have.length(42)
    expect(newAddress.slice(0, 6)).to.not.equal('0x0000')
  });
});

// `async` functions allow us to use the `await` keyword which waits for a
// promise to be resolved and returns what would be passed to the `.then()`
contract('SplitIt', async (accounts) => {

  // `describe` can also be used for greater specificity in the output
  describe('numberOfReceivingAddresses()', () => {

    it('should return expected receivingAddresses array length', async () => {
      const instance = await SplitIt.new(addresses)
      const res = await instance.numberOfReceivingAddresses.call({from: accounts[0]})
      const count = Number(res)
      expect(count).to.equal(addresses.length)
    })
  })
})


/* Output from tests (03/06/2018):
Using network 'development'.



  Contract: SplitItCreator
    ✓ should emit event with new SplitIt address during creation (3038ms)

  Contract: SplitIt
    numberOfReceivingAddresses()
      ✓ should return expected receivingAddresses array length (5070ms)


  2 passing (8s)

*/
