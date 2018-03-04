import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Address from './Address'
import AddSvg from '../icons/Add'
import colors from '../styles/colors'

const Container = styled.div`
  flex: 1 0;
  display: flex;
  max-width: 100%;
  flex-direction: column;
  border-radius: 5px;
`
const AddressesContainer = styled.div`
  border: 1px solid ${colors.address_bg_dark};
  border-bottom: none;
`
const AddButton = styled.div`
  background-color: ${
    props => {
      return props.disabled ?
      colors.button_disabled_bg :
      colors.button_background
    }
  };
  height: 50px;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 0 0 5px 5px;
  ${'' /* border: solid 1px ${colors.button_stroke}; */}
`

class AddressesPane extends React.Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    saveAddress: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  renderAddresses = () => {
    const { addresses, saveAddress, handleDelete, validateAddress } = this.props
    let isDark = false;
    return Object.keys(addresses).map(id => {
      isDark = !isDark
      return (
        <Address
          key={ id }
          id={ id }
          isDark={ isDark }
          value={ addresses[id].address }
          saveAddress={ saveAddress }
          handleDelete={ handleDelete }
          validateAddress={ validateAddress }
        />
      )
    })
  }

  render() {
    const { addAddress, addresses } = this.props
    const addressCount = Object.keys(addresses).length
    return (
      <Container>
        <AddressesContainer>
          { this.renderAddresses() }
        </AddressesContainer>
        <AddButton
          onClick={ addAddress }
          disabled={ addressCount > 9 }
        >
          <AddSvg />
        </AddButton>
      </Container>
    )
  }
}

export default AddressesPane
