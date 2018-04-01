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
import {actions} from './Create.ducks'

const LockedInputButton = styled.div`
  display: flex;
  flex: 1 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`

const EditButton = LockedInputButton.extend`
  background-color: ${colors.button_background};
  border: 1px solid ${colors.button_stroke};
  margin-right: 5px;
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
    attributes: PropTypes.object.isRequired,
    removeAddress: PropTypes.func.isRequired,
    toggleAddressLockedState: PropTypes.func.isRequired,
    isDark: PropTypes.bool.isRequired,
    validateAddress: PropTypes.func.isRequired,
    updateAddressValue: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps.attributes)
    return this.props.attributes.value !== nextProps.attributes.value
  }

  handleChange = (e) => {
    const { validateAddress } = this.props
    this.setState({value: e.target.value})
    if (e.target.value.length < 1) {
      this.setState({isValid: true})
    } else {
      validateAddress(e.target.value)
      .then(() => {
        this.setState({isValid: true})
      })
      .catch(() => {
        this.setState({isValid: false})
      })
    }
  }

  render() {
    const {
      toggleAddressLockedState,
      id,
      removeAddress,
      isDark,
      updateAddressValue,
      attributes,
    } = this.props
    const { isValid, value, isLocked } = attributes

    if (!isLocked) {
      return (
        <AddressContainer isdark={ isDark }>
          <AddressInnerContainer>
            <InputContainer>
              <Input
                defaultValue={ value }
                placeholder="Input a valid Ethereum account address"
                disabled={ isLocked }
                onChange={ (e) => updateAddressValue(id, e.target.value) }
                isvalid={ isValid }
                isempty={ value.length < 1 }
              />
            </InputContainer>
            <ButtonContainer>
              <InputConfirmButton
                onClick={ () => isValid ? toggleAddressLockedState(id) : '' }
                isvalid={ isValid }
              >
                Save
              </InputConfirmButton>
            </ButtonContainer>
          </AddressInnerContainer>
        </AddressContainer>
      )
    }
    return (
      <AddressContainer isdark={ isDark }>
        <AddressInnerContainer>
          <LockedInput>
            <LockedInputText>{ value }</LockedInputText>
          </LockedInput>
          <ButtonContainer>
            <EditButton
              onClick={() => toggleAddressLockedState(id)}
            >
              <EditSvg />
            </EditButton>
            <DeleteButton
              onClick={() => removeAddress(id)}
            >
              <DeleteSvg />
            </DeleteButton>
          </ButtonContainer>
        </AddressInnerContainer>
      </AddressContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  attributes: state.create.addresses[ownProps.id],
})

const mapDispatchToProps = dispatch => ({
  toggleAddressLockedState: (id) => dispatch(actions.toggleAddressLockedState(id)),
  removeAddress: (id) => dispatch(actions.removeAddress(id)),
  updateAddressValue: (id, value) => dispatch(actions.updateAddressValue(id, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
