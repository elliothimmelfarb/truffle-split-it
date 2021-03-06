import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DeleteSvg from '../icons/Delete'
import EditSvg from '../icons/Edit'
import colors from '../styles/colors'

import {
  AddressContainer,
  AddressInnerContainer,
  InputContainer,
  ButtonContainer,
  Input,
  InputConfirmButton,
  LockedInput,
  LockedInputText,
} from '../components/AddressInputComponents.styled'
import {actions, addressStates} from './Create.ducks'

const LockedInputButton = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`

const EditButton = LockedInputButton.extend`
  background-color: ${colors.button_background};
  border: 1px solid ${colors.button_stroke};
  &:hover {
    background-color: #326E9C;
  }
`
const DeleteButton = LockedInputButton.extend`
  background-color: ${colors.delete_button_background};
  border: 1px solid ${colors.delete_button_stroke};
  &:hover {
    background-color: #690800;
  }
`

class Address extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    addressState: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    removeAddress: PropTypes.func.isRequired,
    unlockAddress: PropTypes.func.isRequired,
    isDark: PropTypes.bool.isRequired,
    updateAddressAndValidate: PropTypes.func.isRequired,
    isDisposable: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  shouldComponentUpdate = nextProps => {
    const { isValid, value, addressState, isDisposable, isDark } = this.props
    return (
      isValid !== nextProps.isValid ||
      value !== nextProps.value ||
      addressState !== nextProps.addressState ||
      isDisposable !== nextProps.isDisposable ||
      isDark !== nextProps.isDark
    )
  }

  handleUpdateValue = (e) => {
    const {id, updateAddressAndValidate} = this.props
    updateAddressAndValidate(id, e.target.value)
  }

  handleLockRequest = () => {
    const { id, value, updateAddressAndValidate } = this.props;
    updateAddressAndValidate(id, value);
  }

  render() {
    const {
      unlockAddress,
      id,
      removeAddress,
      isDark,
      value,
      isValid,
      isLocked,
      addressState,
    } = this.props

    switch(addressState) {

      case addressStates.INITIAL_INPUT:
        return (
          <AddressContainer isdark={ isDark }>
            <AddressInnerContainer>
              <InputContainer>
                <Input
                  value={ value }
                  placeholder="Input a valid Ethereum account address"
                  disabled={ isLocked }
                  onChange={ this.handleUpdateValue }
                  isvalid={ isValid }
                  isempty={ value.length < 1 }
                />
              </InputContainer>
              <ButtonContainer>
                { this.props.isDisposable &&
                    <DeleteButton
                      onClick={() => removeAddress(id)}
                    >
                      <DeleteSvg />
                    </DeleteButton>
                }
              </ButtonContainer>
            </AddressInnerContainer>
          </AddressContainer>
        )

      case addressStates.EDITING_INPUT:
        return (
          <AddressContainer isdark={ isDark }>
            <AddressInnerContainer>
              <InputContainer>
                <Input
                  value={ value }
                  placeholder="Input a valid Ethereum account address"
                  disabled={ isLocked }
                  onChange={ this.handleUpdateValue }
                  isvalid={ isValid }
                  isempty={ value.length < 1 }
                  flatRight={ true }
                />
              </InputContainer>
              <ButtonContainer>
                <InputConfirmButton
                  isvalid={ isValid }
                  onClick={ this.handleLockRequest }>
                  Done
                </InputConfirmButton>
                { this.props.isDisposable &&
                    <DeleteButton
                      onClick={() => removeAddress(id)}
                    >
                      <DeleteSvg />
                    </DeleteButton>
                }
              </ButtonContainer>
            </AddressInnerContainer>
          </AddressContainer>
        )

      case addressStates.LOCKED_INPUT:
        return (
          <AddressContainer isdark={ isDark }>
            <AddressInnerContainer>
              <LockedInput>
                <LockedInputText>{ value }</LockedInputText>
              </LockedInput>
              <ButtonContainer>
                <EditButton
                  onClick={() => unlockAddress(id)}
                >
                  <EditSvg />
                </EditButton>
                { this.props.isDisposable &&
                  <DeleteButton
                    onClick={() => removeAddress(id)}
                  >
                    <DeleteSvg />
                  </DeleteButton>
                }
              </ButtonContainer>
            </AddressInnerContainer>
          </AddressContainer>
        )

      default:
        return null

    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  value: state.create.addresses[ownProps.id].value,
  isValid: state.create.addresses[ownProps.id].isValid,
  addressState: state.create.addresses[ownProps.id].addressState,
  isDisposable: state.create.isDisposable,
})

const mapDispatchToProps = dispatch => ({
  removeAddress: id => dispatch(actions.removeAddress(id)),
  updateAddressAndValidate: (id, value) => dispatch(actions.updateAddressAndValidate(id, value)),
  unlockAddress: id => dispatch(actions.unlockAddress(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
