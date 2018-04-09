import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Address from './Address'
import AddSvg from '../icons/Add'
import colors from '../styles/colors'
import {
  BaseButtonBlue,
} from '../components/TopLevelComponents'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { injectGlobal } from 'styled-components';

injectGlobal`
.fade-enter {
  height: 0px;
}

.fade-enter-active {
  height: 60px;
  transition: 100ms ease-in all;
}

.fade-exit {
  height: 60px;
}

.fade-exit-active {
  height:0px;
  transition: 100ms ease-in all;
}

`;

const Container = styled.div`
  flex: 1 0;
  display: flex;
  max-width: 100%;
  flex-direction: column;
  border-radius: 5px;
`
const InnerContainer = styled.div`
`
const AddButton = BaseButtonBlue.extend`
  height: 50px;
  font-size: 1.2em;
  border-radius: 0 0 5px 5px;
  border-top: none;
  width: 100%;
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
    let isDisposable = Object.keys(addresses).length > 2;
    return Object.keys(addresses).map( (id, index) => {
      isDark = !isDark
      return (
        <CSSTransition timeout={100} key={id} classNames="fade">
        <Address
          key={ id }
          id={ id }
          isDark={ isDark }
          isDisposable={ isDisposable }
          value={ addresses[id].address }
          saveAddress={ saveAddress }
          handleDelete={ handleDelete }
          validateAddress={ validateAddress }
        />
      </CSSTransition>
      )
    })
  }

  render() {
    const { addAddress, addresses } = this.props
    const addressCount = Object.keys(addresses).length
    return (
      <Container>
        <InnerContainer>
          <TransitionGroup className="address-list">
          { this.renderAddresses() }
        </TransitionGroup>
        </InnerContainer>
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
