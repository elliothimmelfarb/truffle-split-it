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
} from '../components/AddressComponents'

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
    value: PropTypes.string.isRequired,
    saveAddress: PropTypes.func.isRequired,
    isDark: PropTypes.bool.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: true,
      value: '',
      isValid: true,
    }
  }

  handleSave = () => {
    const { id, saveAddress } = this.props
    saveAddress(id, this.state.value)
    this.setState({ editing: false })
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
    const { isValid } = this.state
    if (this.state.editing) {
      return (
        <AddressContainer isdark={ this.props.isDark }>
          <AddressInnerContainer>
            <InputContainer>
              <Input
                defaultValue={ this.state.value }
                placeholder="Input a valid Ethereum account address"
                disabled={ !this.state.editing }
                onChange={ this.handleChange }
                isvalid={ isValid }
                isempty={ this.state.value.length < 1 }
              />
            </InputContainer>
            <ButtonContainer>
              <InputConfirmButton
                onClick={ () => isValid ? this.handleSave() : '' }
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
      <AddressContainer isdark={ this.props.isDark }>
        <AddressInnerContainer>
          <LockedInput>
            <LockedInputText>{ this.props.value }</LockedInputText>
          </LockedInput>
          <ButtonContainer>
            <EditButton
              onClick={() => this.setState({editing: true})}
            >
              <EditSvg />
            </EditButton>
            <DeleteButton
              onClick={() => this.props.handleDelete(this.props.id)}
            >
              <DeleteSvg />
            </DeleteButton>
          </ButtonContainer>
        </AddressInnerContainer>
      </AddressContainer>
    )
  }
}

export default Address
