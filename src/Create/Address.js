import React from 'react'
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
} from '../components/AddressInputComponents'

const AddressState = {
  initialInput:'INITIAL_INPUT',
  lockedInput:'LOCKED_INPUT',
  editingInput:'EDITING_INPUT',
}

const LockedInputButton = styled.div`
  display: flex;
  height: 100%;
  width: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`

const EditButton = LockedInputButton.extend`
  margin-left: 6px;
  background-color: ${colors.button_background};
  border: 1px solid ${colors.button_stroke};
  &:hover {
    background-color: #326E9C;
  }
`
const DeleteButton = LockedInputButton.extend`
  margin-left: 6px;
  background-color: ${colors.delete_button_background};
  border: 1px solid ${colors.delete_button_stroke};
  &:hover {
    background-color: #690800;
  }
`

class Address extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    saveAddress: PropTypes.func.isRequired,
    isDark: PropTypes.bool.isRequired,
    isDisposable: PropTypes.bool.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      addressState: AddressState.initialInput,
      value: '',
      isValid: true,
    }
  }

  handleSave = () => {
    const { id, saveAddress, isDisposable } = this.props
    saveAddress(id, this.state.value)
    this.setState({ addressState: AddressState.lockedInput})
  }

  handleEditButton = () => {
    this.setState({ addressState: AddressState.editingInput})
  }

  handleChange = (e) => {
    const { id, saveAddress, validateAddress, isDisposable } = this.props
    this.setState({value: e.target.value})
    validateAddress(e.target.value)
    .then(() => {
      saveAddress(id, this.state.value)
      this.setState({isValid: true, addressState: AddressState.lockedInput})
    })
    .catch(() => {
      this.setState({isValid: false})
    })
    console.log(e.target.value);
  }

  render() {
    const { isValid, addressState } = this.state

    switch (addressState) {

      case AddressState.initialInput:
        return (
          <AddressContainer isdark={ this.props.isDark }>
            <AddressInnerContainer>
              <InputContainer>
                <Input
                  defaultValue={ this.state.value }
                  placeholder="Input a valid Ethereum account address"
                  onChange={ this.handleChange }
                  isvalid={ isValid }
                  isempty={ this.state.value.length < 1 }
                  flatEdge={ false }
                />
              </InputContainer>
              { this.props.isDisposable &&
                <ButtonContainer>
                  <DeleteButton
                    onClick={() => this.props.handleDelete(this.props.id)}
                  >
                    <DeleteSvg />
                  </DeleteButton>
                </ButtonContainer>
              }
            </AddressInnerContainer>
          </AddressContainer>
        )

      case AddressState.lockedInput:
        return (
          <AddressContainer isdark={ this.props.isDark }>
            <AddressInnerContainer>
              <LockedInput>
                <LockedInputText>{ this.props.value }</LockedInputText>
              </LockedInput>
              <ButtonContainer>
                <EditButton
                  onClick={ this.handleEditButton }
                >
                  <EditSvg />
                </EditButton>
                { this.props.isDisposable &&
                <DeleteButton
                  onClick={() => this.props.handleDelete(this.props.id)}
                >
                  <DeleteSvg />
                </DeleteButton>
              }
              </ButtonContainer>
            </AddressInnerContainer>
          </AddressContainer>
        )

      case AddressState.editingInput:
        return (
          <AddressContainer isdark={ this.props.isDark }>
            <AddressInnerContainer>
              <InputContainer>
                <Input
                  defaultValue={ this.state.value }
                  placeholder="Input a valid Ethereum account address"
                  onChange={ this.handleChange }
                  isvalid={ isValid }
                  isempty={ this.state.value.length < 1 }
                  flatEdge={ true }
                />
              </InputContainer>
              <ButtonContainer>
                <InputConfirmButton
                  onClick={ () => isValid ? this.handleSave() : '' }
                  isvalid={ isValid }
                >
                  Done
                </InputConfirmButton>
                {this.props.isDisposable &&
                  <DeleteButton
                    onClick={() => this.props.handleDelete(this.props.id)}
                  >
                    <DeleteSvg />
                  </DeleteButton>
                }
              </ButtonContainer>
            </AddressInnerContainer>
          </AddressContainer>
        )

      default:
        return null;

    }
  }
}

export default Address
