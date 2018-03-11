import React, { Component } from 'react';
import PropTypes from 'prop-types'
import shortid from 'shortid'
import contract from 'truffle-contract'

import AddressesPane from './AddressesPane'
import SplitItCreator from '../../build/contracts/SplitItCreator.json'
import {
  Container,
  PaddingContainer,
  TopArea,
  PageTitle,
  StandaloneButton,
  ContentArea,
  NotConnectedPane,
} from '../components/TopLevelComponents'

const PublishButton = StandaloneButton.extend`
  width: 20%;
  height: 60%;
`

class Create extends Component {
  static propTypes = {
    web3: PropTypes.object,
    isConnected: PropTypes.bool.isRequired,
    currentAccount: PropTypes.string,
  }
  static defaultProps = {
    web3: {},
    currentAccount: '0x'
  }

  constructor(props) {
    super(props)
    this.state = {
      addresses: {
        first: {
          address: '',
        },
        second: {
          address: '',
        }
      },
    }
  }

  getAddressCount = () => {
    return Object.keys(this.state.addresses).length
  }

  handleAddAddress = () => {
    if (this.getAddressCount() > 9) return
    const id = shortid.generate()
    const addresses = { ...this.state.addresses }
    addresses[id] = {
      address: ''
    }
    this.setState({ addresses })
  }

  handlePublish = () => {
    const { web3, currentAccount } = this.props
    let { addresses } = this.state

    addresses = Object.keys(addresses).map(id =>
      addresses[id].address
    )

    const splitItCreator = contract(SplitItCreator)
    splitItCreator.setProvider(web3.currentProvider)

    splitItCreator.deployed().then((instance) => {
      instance.createSplitIt(addresses, {from: currentAccount})
      .then(res => {
        console.log(res)
        const newAddress = res.logs[0].args.contractAddress
        alert(`Your new SplitIt contract address is: ${newAddress} (copy and save it!)`)
      })
      .catch(err => console.log(err))
    })
  }

  saveAddress = (id, newAddr) => {
    const addresses = { ...this.state.addresses }
    addresses[id].address = newAddr
    this.setState({ addresses })
  }

  handleDelete = (id) => {
    if (this.getAddressCount() < 3) return
    const addresses = { ...this.state.addresses }
    delete addresses[id]
    this.setState({ addresses })
  }

  validateAddress = (address) => {
    const { web3 } = this.props
    return new Promise((resolve, reject) => {
      if (web3.utils.isAddress(address)) {
        web3.eth.getCode(address, (err, res) => {
          if (err) return reject(err)
          if (res.length > 3) return reject(res)
          resolve(res)
        })
      } else {
        reject()
      }
    })
  }

  render() {
    return (
      <Container>
        <PaddingContainer>
          {
            !this.props.isConnected ?
              <NotConnectedPane>
                Not Connected to the Ethereum Network
              </NotConnectedPane> :
              ''
          }
          <TopArea>
            <PageTitle>Create Split It Contract</PageTitle>
            <PublishButton
              disabled={ !this.props.isConnected }
              onClick={ this.handlePublish }
            >
              Publish
            </PublishButton>
          </TopArea>
          <ContentArea>
            <AddressesPane
              addresses={ this.state.addresses }
              addAddress={ this.handleAddAddress }
              saveAddress={ this.saveAddress }
              handleDelete={ this.handleDelete }
              validateAddress={ this.validateAddress }
            />
          </ContentArea>
        </PaddingContainer>
      </Container>
    );
  }
}

export default Create;
