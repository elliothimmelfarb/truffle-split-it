import React from 'react'
import {connect} from 'react-redux'
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
    addressList: PropTypes.array,
  }

  static defaultProps = {
    addressList: [],
  }

  renderAddresses = () =>
    this.props.addressList.map((addr, i) => {
      return (
        <Address
          address={addr}
          key={addr}
          isDark={i % 2 === 0}
        />
      )
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

const mapStateToProps = state => ({
  addressList: state.view.addressList
})

export default connect(mapStateToProps)(ViewAddressesPane)
