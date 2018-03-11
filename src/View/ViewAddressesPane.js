import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Address from './Address'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`
const InnerContainer = styled.div`

  border-bottom: none;
`

class ViewAddressesPane extends React.Component {
  static propTypes = {
    addressList: PropTypes.array.isRequired,
    currentAccount: PropTypes.string.isRequired,
  }

  renderAddresses = () =>
    this.props.addressList.map((addr, i) => {
      console.log(addr, this.props.currentAccount)
      return <Address
        address={addr}
        key={addr}
        isDark={i % 2 === 0}
        isMe={addr.toLowerCase() === this.props.currentAccount.toLowerCase()}
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
