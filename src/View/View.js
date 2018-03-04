import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AddressSearch from './AddressSearch'
import ViewAddressesPane from './ViewAddressesPane'

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  align-items: center;
`
const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  flex: 1 0;
  align-items: center;
  justify-content: center;
`
const NotConnectedPane = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 0;
  width: 100%;
`
const Title = styled.div`
  display: flex;
  font-size: 1.4em;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  color: white;
`
const ViewArea = styled.div`
  display: flex;
  flex: 12 0;
  width: 100%;
  border: 1px solid red;
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
    }
  }

  handleSearch = (targetAddress) => {
    this.setState({
      isSearching: true,
    })
    this.setState({
      isSearching: false,
      searchSuccessful: true,
      targetContractAddress: targetAddress,
    })
    this.getContract()
  }

  validateAddress = (address) => {
    const {web3} = this.props.web3
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
    return (
      <Container>
        <PaddingContainer>
          {
            !this.props.isConnected ?
              <NotConnectedPane>
                Not Connected to the Ethereum Network
              </NotConnectedPane> : ''
          }
          <TitleContainer>
            <Title>View Split It Contract</Title>
          </TitleContainer>
          <AddressSearch
            isSearching={this.state.isSearching}
            searchSuccessful={this.state.searchSuccessful}
            handleSearch={this.handleSearch}
            validateAddress={this.validateAddress}
          />
          <ViewArea>
            <ViewAddressesPane />
          </ViewArea>
        </PaddingContainer>
      </Container>
    );
  }
}

export default View;
