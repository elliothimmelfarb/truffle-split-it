import React from 'react'
import PropTypes from 'prop-types'

import {
  AddressContainer,
  AddressInnerContainer,
  ButtonContainer,
  LockedInput,
  LockedInputText,
} from '../components/AddressInputComponents'
import {
  BaseButtonBlue
} from '../components/TopLevelComponents'

const WithdrawButton = BaseButtonBlue.extend`
  padding: 5px;
`


class Address extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    isMe: PropTypes.bool,
    isDark: PropTypes.bool,
    handleWithdraw: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isMe: false,
    isDark: false,
  }

  render() {
    return (
      <AddressContainer isdark={this.props.isDark}>
        <AddressInnerContainer>
          <LockedInput>
            <LockedInputText>
              { this.props.address }
            </LockedInputText>
          </LockedInput>
          <ButtonContainer>
            {
              this.props.isMe ?
                <WithdrawButton onClick={this.props.handleWithdraw}>Withdraw</WithdrawButton> :
                ''
            }
          </ButtonContainer>
        </AddressInnerContainer>
      </AddressContainer>
    )
  }
}

export default Address
