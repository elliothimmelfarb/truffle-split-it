# truffle-split-it
The [Split-It](https://github.com/kevinhealy/split-it) project migrated to the [Truffle React Box](http://truffleframework.com/boxes/react)

## How to run development environment locally
1. [Get Ganache](http://truffleframework.com/ganache/) and [Node LTS](https://nodejs.org/en/)
2. Ensure you have a browser with the MetaMask extension
3. Clone this project, enter the directory, and do an NPM install:
```
$ git clone https://github.com/elliothimmelfarb/truffle-split-it.git
$ cd truffle-split-it
$ npm install
```
4. Run Ganache and open the Ganache options with the "cog icon in the top right:
![](https://user-images.githubusercontent.com/11192126/36949988-ee94f3c8-1fac-11e8-9860-9354f0885666.png)
5. Ensure that the RPC server is being hosted on port 8545. Also, set the mining block time to 3 seconds. Restart the network to accept changes and ensure the top bar matches this: 
![](https://user-images.githubusercontent.com/11192126/36949949-1ccdbf14-1fac-11e8-80a0-1bc110bb46f8.png)
5. Go to your browser, open MetaMask, log out of your account if you are already logged in. 
6. Open the network selection interface and choose the `localhost` option:
![](https://user-images.githubusercontent.com/11192126/36950052-d0702448-1fad-11e8-9b97-38f83f0a6ff6.png)
7. At the log-in page in MetaMask, choose the `Restore from seed phrase` option.
8. Go back to Ganache on the `Accounts` view. Copy the mnemonic phrase and paste into the MetaMask seed phrase input box. 
![](https://user-images.githubusercontent.com/11192126/36950105-5898a840-1fae-11e8-9fd9-fdd022a237aa.png)
9. Make an easy to remember password (this is for development!) and confirm. You should then have access to the accounts on the test network and the Ether that was seeded in them. You have now connected your browser to the development Ethereum network running on Ganache.
