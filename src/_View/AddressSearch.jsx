import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
  AddressContainer,
  AddressInnerContainer,
  InputContainer,
  Input,
  ButtonContainer,
  InputConfirmButton,
} from '../components/AddressInputComponents.styled'
import {actions} from './View.ducks'

const Container = AddressContainer.extend`
  background-color: transparent;
  flex: 1 0;
`
export const SearchButton = InputConfirmButton.extend`
  width: 90px;
`
class AddressSearch extends React.Component {
  static propTypes = {
    targetAddress: PropTypes.string.isRequired,
    isSearching: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
    updateAndValidate: PropTypes.func.isRequired,
    searchAddressIsValid: PropTypes.bool.isRequired,
  }

  handleSearch = () => {
    this.props.search()
  }

  handleChange = (e) => {
    this.props.updateAndValidate(e.target.value)
  }

  render() {
    const {searchAddressIsValid, targetAddress} = this.props
    return (
      <Container>
        <AddressInnerContainer>
          <InputContainer>
            {
              <Input
                placeholder="Address of Existing Split It Contract"
                defaultValue={this.props.targetAddress}
                onChange={ this.handleChange }
                isvalid={ searchAddressIsValid }
                isempty={ targetAddress.length < 1 }
                flatEdge={ true }
              />
            }
          </InputContainer>
          <ButtonContainer>
            {
              <SearchButton
                onClick={() => searchAddressIsValid ? this.handleSearch() : ''}
                isvalid={ searchAddressIsValid }
              >
                Search
              </SearchButton>
            }
          </ButtonContainer>
        </AddressInnerContainer>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  targetAddress: state.view.targetAddress,
  addressList: state.view.addressList,
  searchAddressIsValid: state.view.searchAddressIsValid,
  searchIsLocked: state.view.searchIsLocked,
  isSearching: state.view.isSearching,
})

const mapDispatchToProps = dispatch => ({
  search: (address) => dispatch(actions.search(address)),
  updateAndValidate: (val) => dispatch(actions.updateAndValidateSearchValue(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearch)
