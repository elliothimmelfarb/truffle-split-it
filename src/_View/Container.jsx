import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
} from '../components/TopLevelComponents.styled'
import {
  AddressContainer,
  AddressInnerContainer,
  InputContainer,
  LockedInput,
  LockedInputText,
  ButtonContainer,
} from '../components/AddressInputComponents.styled'
import {actions} from './View.ducks'

const TransparentContainer = AddressContainer.extend`
  background-color: transparent;
`
const DepositButton = BaseButtonBlue.extend`
  padding: 10px;
`

class View extends Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
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

  handleWithdraw = () => {
    const {web3, currentAccount} = this.props
    const splitit = new SplitIt(web3, currentAccount)
    splitit.withdraw(this.state.targetContractAddress)
    .then(res => {
      console.log(res)
    })
  }

  render() {
    const {
      isConnected,
      targetAddress,
      openDepositModal,
      addressList,
    } = this.props

    return (
      <Container>
        <DepositModal />
        <PaddingContainer>
          {
            !isConnected ?
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
            addressList.length ?
              <TransparentContainer>
                <AddressInnerContainer>
                  <InputContainer>
                    <LockedInput>
                      <LockedInputText>
                        {targetAddress}
                      </LockedInputText>
                    </LockedInput>
                  </InputContainer>
                  <ButtonContainer>
                    <DepositButton
                      onClick={openDepositModal}
                    >
                      Deposit
                    </DepositButton>
                  </ButtonContainer>
                </AddressInnerContainer>
              </TransparentContainer> : ''
          }
          <ContentArea>
            <ViewAddressesPane />
          </ContentArea>
        </PaddingContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.app.isConnected,
  addressList: state.view.addressList,
  isSearching: state.view.isSearching,
})

const mapDispatchToProps = dispatch => ({
  openDepositModal: () => dispatch(actions.openDepositModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(View)
