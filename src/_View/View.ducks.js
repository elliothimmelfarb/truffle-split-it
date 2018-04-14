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


// THUNK ACTIONS
function validateContractAddress(address) {
  return (dispatch, getState) => {
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


// ACTION EXPORTS

export const actions = {
  openDepositModal,
  closeDepositModal,
  updateDepositAmount,
  updateDepositTipAmount,
  validateContractAddress,
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
        searchAddressIsValid: true
      })
    }
    case SEARCH_ADDRESS_IS_NOT_VALID: {
      return Object.assign({}, state, {
        searchAddressIsValid: false
      })
    }
    default: {
      return state
    }
  }
}
