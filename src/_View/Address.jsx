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

const WithdrawButton = BaseButtonBlue.extend`
  padding: 5px;
`


class Address extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
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

const mapStateToProps = state => ({
  currentAccount: state.app.currentAccount
})

// const mapDispatchToProps = dispatch => ({
//   handleWithdraw: () => dispatch(action)
// })

export default connect(mapStateToProps)(Address)
