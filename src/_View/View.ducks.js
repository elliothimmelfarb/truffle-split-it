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

const OPEN_WITHDRAW_MODAL = 'view/OPEN_WITHDRAW_MODAL'
const openWithdrawModal = () => ({
  type: OPEN_WITHDRAW_MODAL,
})

const CLOSE_WITHDRAW_MODAL = 'view/CLOSE_WITHDRAW_MODAL'
const closeWithdrawModal = () => ({
  type: CLOSE_WITHDRAW_MODAL,
})

const UPDATE_DEPOSIT_AMOUNT = 'view/UPDATE_DEPOSIT_AMOUNT'
const updateDepositAmount = (amount) => ({
  amount,
  type: UPDATE_DEPOSIT_AMOUNT,
})

const UPDATE_TIP_AMOUNT = 'view/UPDATE_TIP_AMOUNT'
const updateTipAmount = (amount) => ({
  amount,
  type: UPDATE_TIP_AMOUNT,
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

    const {web3} = getState().app
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

function search() {
  return (dispatch, getState) => {
    dispatch(searchInitiated())

    const state = getState()

    const { web3, currentAccount } = state.app
    const { targetAddress } = state.view

    const splitit = new SplitIt(web3, currentAccount)

    console.log(targetAddress)

    splitit.search(targetAddress)
    .then((addressList) => {
      dispatch(searchSuccess(addressList))
    }).catch(err => dispatch(searchFailure(err)))
  }
}

function deposit() {
  return (dispatch, getState) => {
    const state = getState()
    const {web3, currentAccount} = state.app
    const {depositAmount, tipAmount, targetAddress} = state.view
    console.log({depositAmount, tipAmount})
    const amount = parseFloat(tipAmount) + parseFloat(depositAmount)
    const splitit = new SplitIt(web3, currentAccount)
    splitit.deposit(targetAddress, amount)
    .then(res => console.log(res))
  }
}


// ACTION EXPORTS

export const actions = {
  openDepositModal,
  closeDepositModal,
  updateDepositAmount,
  updateTipAmount,
  updateAndValidateSearchValue,
  search,
  openWithdrawModal,
  closeWithdrawModal,
  deposit,
}


// INITIAL STATE

const initialState = {
  depositModalIsOpen: false,
  withdrawModalIsOpen: false,
  searchAddressIsValid: false,
  searchIsLocked: false,
  targetAddress: '',
  depositAmount: 0.0,
  tipAmount: 0.0,
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
    case OPEN_WITHDRAW_MODAL: {
      return Object.assign({}, state, {
        withdrawModalIsOpen: true
      })
    }
    case CLOSE_WITHDRAW_MODAL: {
      return Object.assign({}, state, {
        withdrawModalIsOpen: false
      })
    }
    case UPDATE_DEPOSIT_AMOUNT: {
      return Object.assign({}, state, {
        depositAmount: action.amount
      })
    }
    case UPDATE_TIP_AMOUNT: {
      return Object.assign({}, state, {
        tipAmount: action.amount
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
    case UPDATE_SEARCH_VALUE: {
      return Object.assign({}, state, {
        targetAddress: action.value,
      })
    }
    default: {
      return state
    }
  }
}
