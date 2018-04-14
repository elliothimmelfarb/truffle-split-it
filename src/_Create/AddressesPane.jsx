import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import Address from './Address'
import AddSvg from '../icons/Add'
import {
  BaseButtonBlue,
} from '../components/TopLevelComponents.styled'
import {actions} from './Create.ducks'
import './index.css';


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
  }

  renderAddresses = () => {
    const { addresses, saveAddress } = this.props
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

const mapStateToProps = state => ({
  addresses: state.create.addresses
})

const mapDispatchToProps = dispatch => ({
  addAddress: () => dispatch(actions.addAddress()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressesPane)
