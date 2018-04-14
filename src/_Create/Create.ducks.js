import shortid from 'shortid'


// CONSTANT AND ACTION CREATOR PAIRS

const ADD_ADDRESS = 'create/ADD_ADDRESS'
const addAddress = () => ({
  type: ADD_ADDRESS,
})

const REMOVE_ADDRESS = 'create/REMOVE_ADDRESS'
const removeAddress = (id) => ({
  id,
  type: REMOVE_ADDRESS,
})

const UNLOCK_ADDRESS = 'create/UNLOCK_ADDRESS'
const unlockAddress = (id) => ({
  id,
  type: UNLOCK_ADDRESS,
})

const UPDATE_ADDRESS_VALUE = 'create/UPDATE_ADDRESS_VALUE'
const updateAddressValue = (id, value) => ({
  id,
  value,
  type: UPDATE_ADDRESS_VALUE,
})

const ADDRESS_IS_VALID = 'create/ADDRESS_IS_VALID'
const addressIsValid = (id) => ({
  id,
  type: ADDRESS_IS_VALID,
})

const ADDRESS_IS_NOT_VALID = 'create/ADDRESS_IS_NOT_VALID'
const addressIsNotValid = (id) => ({
  id,
  type: ADDRESS_IS_NOT_VALID,
})


// THUNK ACTIONS

function validateAccountAddress(id, address) {
  return (dispatch, getState) => {
    const state = getState()
    const {web3} = state.app
    if (web3.utils.isAddress(address)) {
      web3.eth.getCode(address, (err, res) => {
        if (err) {
          return dispatch(addressIsNotValid(id))
        }
        if (res.length > 3) return dispatch(addressIsNotValid(id))
        dispatch(addressIsValid(id))
      })
    } else {
      dispatch(addressIsNotValid(id))
    }
  }
}

function updateAddressAndValidate(id, value) {
  return (dispatch, getState) => {
    const state = getState()
    const {web3} = state.app
    dispatch(updateAddressValue(id, value))
    if (web3.utils.isAddress(value)) {
      web3.eth.getCode(value, (err, res) => {
        if (err) return dispatch(addressIsNotValid(id))
        if (res.length > 3) return dispatch(addressIsNotValid(id))
        dispatch(addressIsValid(id))
      })
    } else {
      dispatch(addressIsNotValid(id))
    }
  }
}


// ACTION EXPORTS

export const actions = {
  addAddress,
  removeAddress,
  unlockAddress,
  updateAddressAndValidate,
  validateAccountAddress,
}


export const addressStates = {
  INITIAL_INPUT: 'INITIAL_INPUT',
  LOCKED_INPUT: 'LOCKED_INPUT',
  EDITING_INPUT: 'EDITING_INPUT'
}


// INITIAL STATE

const initialState = {
  isDisposable: false,
  addresses: {
    [shortid.generate()]: {
      value: '',
      addressState: addressStates.INITIAL_INPUT,
      isValid: false,
    },
    [shortid.generate()]: {
      value: '',
      addressState: addressStates.INITIAL_INPUT,
      isValid: false,
    },
  }
}


// REDUCER

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_ADDRESS: {
      const addresses = {
        ...state.addresses,
        [shortid.generate()]: {
          value: '',
          addressState: addressStates.INITIAL_INPUT,
          isValid: false,
        }
      }
      const isDisposable = Object.keys(addresses).length > 2 ? true : false
      return Object.assign({}, state, {addresses, isDisposable})
    }
    case REMOVE_ADDRESS: {
      const addresses = {...state.addresses}
      const isDisposable = Object.keys(addresses).length > 2 ? true : false
      delete addresses[action.id]
      return Object.assign({}, state, {addresses, isDisposable})
    }
    case UNLOCK_ADDRESS: {
      const addresses = {...state.addresses}
      addresses[action.id].addressState = addressStates.EDITING_INPUT
      return Object.assign({}, state, {addresses})
    }
    case UPDATE_ADDRESS_VALUE: {
      const addresses = {...state.addresses}
      addresses[action.id].value = action.value
      return Object.assign({}, state, {addresses})
    }
    case ADDRESS_IS_VALID: {
      const addresses = {...state.addresses}
      addresses[action.id].isValid = true
      addresses[action.id].addressState = addressStates.LOCKED_INPUT
      return Object.assign({}, state, {addresses})
    }
    case ADDRESS_IS_NOT_VALID: {
      const addresses = {...state.addresses}
      addresses[action.id].isValid = false
      addresses[action.id].addressState = addressStates.EDITING_INPUT
      return Object.assign({}, state, {addresses})
    }
    default: {
      return state
    }
  }
}
