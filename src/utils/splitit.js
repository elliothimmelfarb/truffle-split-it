import contract from 'truffle-contract'
import SplitIt from '../../build/contracts/SplitIt.json'


class Splitit {
  constructor(web3, currentAccount) {
    this.web3 = web3
    this.currentAccount = currentAccount
    this.splitIt = contract(SplitIt)
    this.splitIt.setProvider(web3.currentProvider)
  }

  deposit = (targetAddress) => {
    return new Promise((resolve, reject) => {
      const instance = this.splitIt.at(targetAddress)

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
