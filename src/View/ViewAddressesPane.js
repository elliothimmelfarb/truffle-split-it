import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Address from './Address'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  flex: 1 0;
  border: 1px solid blue;
  border-radius: 5px;
`

class ViewAddressesPane extends React.Component {
  static propTypes = {
    addressList: PropTypes.array.isRequired,
  }

  renderAddresses = () =>
    this.props.addressList.map(addr =>
      <Address
        address={addr}
        key={addr}
      />
    )

  render() {
    return (
      <Container>
        { this.renderAddresses() }
      </Container>
    )
  }
}

export default ViewAddressesPane
