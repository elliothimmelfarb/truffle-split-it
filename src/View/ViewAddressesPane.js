import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Address from './Address'

const Container = styled.div`
  width: 100%;
`
const InnerContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
`

class ViewAddressesPane extends React.Component {
  static propTypes = {
    addressList: PropTypes.array.isRequired,
    currentAccount: PropTypes.string.isRequired,
    handleWithdraw: PropTypes.func.isRequired,
  }

  renderAddresses = () =>
    this.props.addressList.map((addr, i) => {
      return <Address
        address={addr}
        key={addr}
        isDark={i % 2 === 0}
        isMe={addr.toLowerCase() === this.props.currentAccount.toLowerCase()}
        handleWithdraw={this.props.handleWithdraw}
      />
    })

  render() {
    return (
      <Container>
        <InnerContainer>
          { this.renderAddresses() }
        </InnerContainer>
      </Container>
    )
  }
}

export default ViewAddressesPane
