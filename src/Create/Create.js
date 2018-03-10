import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid'
import contract from 'truffle-contract'

import AddressesPane from './AddressesPane'
import colors from '../styles/colors'
import SplitItCreator from '../../build/contracts/SplitItCreator.json'

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  display: flex;
`
const TopArea = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0;
  font-size: 1.2em;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const AddressesArea = styled.div`
  flex: 12 0;
  display: flex;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  color: ${colors.default_text};
`
const PublishButton = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 20%;
  height: 60%;
  background-color: ${
    props => props.disabled ?
    colors.button_disabled_bg :
    colors.button_background
  };
  color: ${colors.button_content};
  border: solid 1px ${colors.button_stroke};
  border-radius: 5px;
  font-size: .9em;
  cursor: pointer;
  @media (hover:none) {
    &:active {
      background-color: #326E9C;
    }
  }
  @media (hover:hover) {
    &:hover {
      background-color: #326E9C;
    }
  }
}
`
const Title = styled.div`
  display: flex;
  font-size: 1.15em;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: white;
`
const NotConnectedPane = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
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

  handlePublish = (e) => {
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
            <Title>Create Split It Contract</Title>
            <PublishButton
              disabled={ !this.props.isConnected }
              onClick={ this.handlePublish }
            >
              Publish
            </PublishButton>
          </TopArea>
          <AddressesArea>
            <AddressesPane
              addresses={ this.state.addresses }
              addAddress={ this.handleAddAddress }
              saveAddress={ this.saveAddress }
              handleDelete={ this.handleDelete }
              validateAddress={ this.validateAddress }
            />
          </AddressesArea>
        </PaddingContainer>
      </Container>
    );
  }
}

export default Create;
