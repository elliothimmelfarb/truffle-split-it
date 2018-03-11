import React, { Component } from 'react';
import PropTypes from 'prop-types';
import contract from 'truffle-contract';

import SplitIt from '../utils/splitit'
import AddressSearch from './AddressSearch'
import ViewAddressesPane from './ViewAddressesPane'
import {
  Container,
  PaddingContainer,
  NotConnectedPane,
  ContentArea,
  BaseButtonBlue,
} from '../components/TopLevelComponents'
import {
  AddressContainer,
  AddressInnerContainer,
  InputContainer,
  LockedInput,
  LockedInputText,
  ButtonContainer,
} from '../components/AddressInputComponents'

const TransparentContainer = AddressContainer.extend`
  background-color: transparent;
`
const DepositButton = BaseButtonBlue.extend`
  padding: 10px;
`

class View extends Component {
  static propTypes = {
    web3: PropTypes.object,
    isConnected: PropTypes.bool.isRequired,
    currentAccount: PropTypes.string
  }
  static defaultProps = {
    web3: {},
    currentAccount: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      searchSuccessful: false,
      isSearching: false,
      targetContractAddress: '',
      addressList: [],
    }

  }

  handleSearch = (targetAddress) => {
    this.setState({
      isSearching: true,
    })

    const component = this

    const splitit = new SplitIt(this.props.web3, this.props.currentAccount)

    splitit.search(targetAddress)
    .then((addressList) => {
      this.setState({
        addressList,
        isSearching: false,
        searchSuccessful: true,
        targetContractAddress: targetAddress,
      })
    }).catch(err => console.log('err:', err))
  }

  validateAddress = (address) => {
    const {web3} = this.props
    return new Promise((resolve, reject) => {
      if (web3.utils.isAddress(address)) {
        web3.eth.getCode(address, (err, res) => {
          if (err) return reject()
          if (res === '0x') return reject()
          resolve()
        })
      } else {
        reject()
      }
    })
  }

  render() {
    console.log(this.state.addressList)
    return (
      <Container>
        <PaddingContainer>
          {
            !this.props.isConnected ?
              <NotConnectedPane>
                Not Connected to the Ethereum Network
              </NotConnectedPane> : ''
          }
          <AddressSearch
            isSearching={this.state.isSearching}
            searchSuccessful={this.state.searchSuccessful}
            handleSearch={this.handleSearch}
            validateAddress={this.validateAddress}
          />
          {
            this.state.searchSuccessful ?
              <TransparentContainer>
                <AddressInnerContainer>
                  <InputContainer>
                    <LockedInput>
                      <LockedInputText>
                        {this.state.targetContractAddress}
                      </LockedInputText>
                    </LockedInput>
                  </InputContainer>
                  <ButtonContainer>
                    <DepositButton>
                      Deposit
                    </DepositButton>
                  </ButtonContainer>
                </AddressInnerContainer>
              </TransparentContainer> :
              ''
              }
          <ContentArea>
            <ViewAddressesPane
              addressList={this.state.addressList}
              currentAccount={this.props.currentAccount}
            />
          </ContentArea>
        </PaddingContainer>
      </Container>
    );
  }
}

export default View;
