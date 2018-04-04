import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SplitIt from '../utils/splitit'
import AddressSearch from './AddressSearch'
import ViewAddressesPane from './ViewAddressesPane'
import DepositModal from './DepositModal'
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
      depositModalOpen: false,
    }

  }

  handleSearch = (targetAddress) => {

    this.setState({
      isSearching: true,
    })

    const { web3, currentAccount } = this.props

    const splitit = new SplitIt(web3, currentAccount)

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

  handleDepositModalOpen = () => {
    this.setState({depositModalIsOpen: true})
  }

  handleDepositModalClose = () => {
    this.setState({depositModalIsOpen: false})
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

  handleWithdraw = () => {
    const {web3, currentAccount} = this.props
    const splitit = new SplitIt(web3, currentAccount)
    splitit.withdraw(this.state.targetContractAddress)
    .then(res => {
      console.log(res)
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
              </NotConnectedPane> : this.props.currentAccount == '' ?
                <NotConnectedPane>
                  No Account
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
                    <DepositButton
                      onClick={this.handleDepositModalOpen}
                    >
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
              handleWithdraw={this.handleWithdraw}
            />
          </ContentArea>
        </PaddingContainer>
        <DepositModal
          modalIsOpen={this.state.depositModalIsOpen}
          closeModal={this.handleDepositModalClose}
          targetAddress={this.state.targetContractAddress}
          web3={this.props.web3}
          currentAccount={this.props.currentAccount}
        />
      </Container>
    );
  }
}

export default View;
