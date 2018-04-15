import SplitIt from '../utils/splitit'


// CONSTANT AND ACTION CREATOR PAIRS

const OPEN_DEPOSIT_MODAL = 'view/OPEN_DEPOSIT_MODAL'
const openDepositModal = () => ({
  type: OPEN_DEPOSIT_MODAL,
})

const CLOSE_DEPOSIT_MODAL = 'view/CLOSE_DEPOSIT_MODAL'
const closeDepositModal = () => ({
  type: CLOSE_DEPOSIT_MODAL,
})

const UPDATE_DEPOSIT_AMOUNT = 'view/UPDATE_DEPOSIT_AMOUNT'
const updateDepositAmount = (amount) => ({
  amount,
  type: UPDATE_DEPOSIT_AMOUNT,
})

const UPDATE_DEPOSIT_TIP_AMOUNT = 'view/UPDATE_DEPOSIT_TIP_AMOUNT'
const updateDepositTipAmount = (amount) => ({
  amount,
  type: UPDATE_DEPOSIT_TIP_AMOUNT,
})

const SEARCH_ADDRESS_IS_VALID = 'view/SEARCH_ADDRESS_IS_VALID'
const searchAddressIsValid = () => ({
  type: SEARCH_ADDRESS_IS_VALID,
})

const SEARCH_ADDRESS_IS_NOT_VALID = 'view/SEARCH_ADDRESS_IS_NOT_VALID'
const searchAddressIsNotValid = () => ({
  type: SEARCH_ADDRESS_IS_NOT_VALID,
})

const SEARCH_INITIATED = 'view/SEARCH_INITIATED'
const searchInitiated = () => ({
  type: SEARCH_INITIATED,
})

const SEARCH_SUCCESS = 'view/SEARCH_SUCCESS'
const searchSuccess = (addressList) => ({
  addressList,
  type: SEARCH_SUCCESS,
})

const SEARCH_FAILURE = 'view/SEARCH_FAILURE'
const searchFailure = () => ({
  type: SEARCH_FAILURE,
})

const UPDATE_SEARCH_VALUE = 'view/UPDATE_SEARCH_VALUE'
const updateSearchValue = (value) => ({
  value,
  type: UPDATE_SEARCH_VALUE,
})


// THUNK ACTIONS
function updateAndValidateSearchValue(address) {
  return (dispatch, getState) => {
    dispatch(updateSearchValue(address))
    const web3 = getState().app.web3
    if (web3.utils.isAddress(address)) {
      web3.eth.getCode(address, (err, res) => {
        if (err) return dispatch(searchAddressIsNotValid())
        if (res === '0x') return dispatch(searchAddressIsNotValid())
        dispatch(searchAddressIsValid())
      })
    } else {
      dispatch(searchAddressIsNotValid())
    }
  }
}

function search(address) {
  return (dispatch, getState) => {
    dispatch(searchInitiated())

    const { web3, currentAccount } = this.getState().app

    const splitit = new SplitIt(web3, currentAccount)

    splitit.search(address)
    .then((addressList) => {
      dispatch(searchSuccess(addressList))
    }).catch(err => dispatch(searchFailure(err)))
  }
}


// ACTION EXPORTS

export const actions = {
  openDepositModal,
  closeDepositModal,
  updateDepositAmount,
  updateDepositTipAmount,
  updateAndValidateSearchValue,
  search,
}


// INITIAL STATE

const initialState = {
  depositModalIsOpen: false,
  searchAddressIsValid: false,
  searchIsLocked: false,
  targetAddress: '',
  depositAmount: 0.0,
  depositTipAmount: 0.0,
  isSearching: false,
  addressList: [],
}


// REDUCER

export default (state = initialState, action) => {
  switch(action.type) {
    case OPEN_DEPOSIT_MODAL: {
      return Object.assign({}, state, {
        depositModalIsOpen: true
      })
    }
    case CLOSE_DEPOSIT_MODAL: {
      return Object.assign({}, state, {
        depositModalIsOpen: false
      })
    }
    case UPDATE_DEPOSIT_AMOUNT: {
      return Object.assign({}, state, {
        depositAmount: action.amount
      })
    }
    case UPDATE_DEPOSIT_TIP_AMOUNT: {
      return Object.assign({}, state, {
        depositTipAmount: action.amount
      })
    }
    case SEARCH_ADDRESS_IS_VALID: {
      return Object.assign({}, state, {
        searchAddressIsValid: true,
        searchIsLocked: true,
      })
    }
    case SEARCH_ADDRESS_IS_NOT_VALID: {
      return Object.assign({}, state, {
        searchAddressIsValid: false
      })
    }
    case SEARCH_INITIATED: {
      return Object.assign({}, state, {
        isSearching: true
      })
    }
    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        addressList: action.addressList,
        isSearching: false,
        addressIsLocked: true,
      })
    }
    case SEARCH_FAILURE: {
      return Object.assign({}, state, {
        addressList: action.addressList,
        isSearching: false,
      })
    }
    default: {
      return state
    }
  }
}
