import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {
  AddressContainer,
  AddressInnerContainer,
  ButtonContainer,
  LockedInput,
  LockedInputText,
} from '../components/AddressInputComponents.styled'
import {
  BaseButtonBlue
} from '../components/TopLevelComponents.styled'
import {actions} from './View.ducks'

const WithdrawButton = BaseButtonBlue.extend`
  padding: 5px;
`


class Address extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    isDark: PropTypes.bool,
    openWithdrawModal: PropTypes.func.isRequired,
    currentAccount: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isMe: false,
    isDark: false,
  }

  render() {
    const {
      isDark,
      openWithdrawModal,
      currentAccount,
      address,
    } = this.props

    const withdrawable = currentAccount.toLowerCase() === address.toLowerCase()

    return (
      <AddressContainer isdark={isDark}>
        <AddressInnerContainer>
          <LockedInput>
            <LockedInputText>
              { this.props.address }
            </LockedInputText>
          </LockedInput>
          <ButtonContainer>
            {
              withdrawable &&
              <WithdrawButton onClick={openWithdrawModal}>
                Withdraw
              </WithdrawButton>
            }
          </ButtonContainer>
        </AddressInnerContainer>
      </AddressContainer>
    )
  }
}

const mapStateToProps = state => ({
  currentAccount: state.app.currentAccount
})

const mapDispatchToProps = dispatch => ({
  openWithdrawModal: () => dispatch(actions.openWithdrawModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
