import contract from 'truffle-contract'
import SplitIt from '../../build/contracts/SplitIt.json'
import SplitItCreator from '../../build/contracts/SplitItCreator.json'


class Splitit {
  constructor(web3, currentAccount) {
    this.web3 = web3
    this.currentAccount = currentAccount
    this.splitIt = contract(SplitIt)
    this.splitIt.setProvider(web3.currentProvider)
    this.splitItCreator = contract(SplitItCreator)
    this.splitItCreator.setProvider(web3.currentProvider)
  }

  deposit = (targetAddress, amount) => {
    return new Promise((resolve, reject) => {
      const instance = SplitIt.at(targetAddress)
      instance.send(this.web3.utils.toWei(amount.toString(), "ether"), {from: this.currentAccount})
      .then(res => {
        console.log(res)
        resolve()
      })
    })
  }

  publish = (addresses) => {
    return new Promise((resolve, reject) => {
      this.splitItCreator.deployed().then((instance) => {
        instance.createSplitIt(addresses, {from: this.currentAccount})
        .then(res => {
          console.log(res)
          const newAddress = res.logs[0].args.contractAddress
          resolve(newAddress)
        })
        .catch(err => console.log(err))
      })
    })
  }

  search = (targetAddress) => {
    return new Promise((resolve, reject) => {
      const instance = this.splitIt.at(targetAddress)
      const { currentAccount } = this

      instance.numberOfReceivingAddresses.call({from: currentAccount})
      .then(async res => {
        const count = Number(res)
        const addressList = []
        for (let i = 0; i < count; i += 1) {
          const address = await instance.receivingAddresses.call(i, {from: currentAccount})
          addressList.push(address)
        }
        resolve(addressList)
      })
      .catch(err => console.log('err:', err))
    })
  }
}

export default Splitit
