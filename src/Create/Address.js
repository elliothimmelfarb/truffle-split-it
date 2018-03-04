import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DeleteSvg from '../icons/Delete'
import EditSvg from '../icons/Edit'
import colors from '../styles/colors'


const Container = styled.div`
  display: flex;
  height: 65px;
  width: 100%;
  align-items: center;
  background-color: ${
    props => props.isdark ? `${colors.address_bg_dark}` : `${colors.address_bg_light}`
  };
`
const InnerContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  margin: 5px;
  justify-content: space-around;
  width: 100%;
`
const InputContainer = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  height: 100%;
`
const Input = styled.input`
  width: 100%;
  height: 60%;
  font-size: 13px;
  border-radius: 5px 0 0 5px;
  padding: 0 5px;
  border: 1px solid ${props => props.isempty ? 'grey' : props.isvalid ? 'green' : 'red'};
`
const ButtonContainer = styled.div`
  flex: 1 0;
  display: flex;
  height: 60%;
  align-items: center;
`
const SaveButton = styled.div`
  display: flex;
  flex: 1 0;
  height: 100%;
  text-align: center;
  background-color: ${props => props.isvalid ? colors.button_background : colors.button_disabled_bg};
  justify-content: center;
  align-items: center;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${colors.button_stroke};
  border-left: none;
  padding: 0 10px;
  color: ${colors.button_content};
`
const LockedInput = styled.div`
  display: flex;
  width: 75vw;
  height: 80%;
  align-items: center;
  color: ${colors.default_text};
  font-size: 13px;
  padding-left: 5px;
`
const LockedInputText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  color: grey;
  font-size: 1.2em;
`
const EditButton = styled.div`
  display: flex;
  flex: 1 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.button_background};
  border: 1px solid ${colors.button_stroke};
  border-radius: 5px;
  margin-right: 5px;
`
const DeleteButton = styled.div`
  display: flex;
  flex: 1 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.delete_button_background};
  border: 1px solid ${colors.delete_button_stroke};
  border-radius: 5px
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
    const { isValid, value } = this.state
    if (this.state.editing) {
      return (
        <Container isdark={ this.props.isDark }>
          <InnerContainer>
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
              <SaveButton
                onClick={ () => isValid ? this.handleSave() : '' }
                isvalid={ isValid }
              >
                Save
              </SaveButton>
            </ButtonContainer>
          </InnerContainer>
        </Container>
      )
    }
    return (
      <Container isdark={ this.props.isDark }>
        <InnerContainer>
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
        </InnerContainer>
      </Container>
    )
  }
}

export default Address
