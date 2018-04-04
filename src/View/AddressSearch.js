import React from 'react'
import PropTypes from 'prop-types'

import {
  AddressContainer,
  AddressInnerContainer,
  InputContainer,
  Input,
  ButtonContainer,
  InputConfirmButton,
} from '../components/AddressInputComponents'

const Container = AddressContainer.extend`
  background-color: transparent;
  flex: 1 0;
`

class AddressSearch extends React.Component {
  static propTypes = {
    isSearching: PropTypes.bool.isRequired,
    searchSuccessful: PropTypes.bool.isRequired,
    validateAddress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      targetAddress: '',
      addressLocked: false,
      isValid: true,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.searchSuccessful) this.setState({addressLocked: true})
  }

  handleSearch = () => {
    this.props.handleSearch(this.state.targetAddress)
  }

  handleChange = (e) => {
    const { validateAddress } = this.props
    this.setState({targetAddress: e.target.value})
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
    const {isValid, targetAddress} = this.state
    return (
      <Container>
        <AddressInnerContainer>
          <InputContainer>
            {
              <Input
                placeholder="Address of Existing Split It Contract"
                value={this.state.targetAddress}
                onChange={ this.handleChange }
                isvalid={ isValid }
                isempty={ targetAddress.length < 1 }
                flatEdge={ true }
              />
            }
          </InputContainer>
          <ButtonContainer>
            {
              <InputConfirmButton
                onClick={() => isValid ? this.handleSearch() : ''}
                isvalid={ isValid }
              >
                Search
              </InputConfirmButton>
            }
          </ButtonContainer>
        </AddressInnerContainer>
      </Container>
    )
  }
}

export default AddressSearch
