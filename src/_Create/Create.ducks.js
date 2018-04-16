import shortid from 'shortid'
import SplitIt from '../utils/splitit'


// CONSTANT AND ACTION CREATOR PAIRS

const OPEN_PUBLISH_MODAL = 'create/OPEN_PUBLISH_MODAL'
const openPublishModal = () => ({
  type: OPEN_PUBLISH_MODAL,
})

const CLOSE_PUBLISH_MODAL = 'create/CLOSE_PUBLISH_MODAL'
const closePublishModal = () => ({
  type: CLOSE_PUBLISH_MODAL,
})

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

const UPDATE_TIP_AMOUNT = 'create/UPDATE_TIP_AMOUNT'
const updateTipAmount = (amount) => ({
  amount,
  type: UPDATE_TIP_AMOUNT,
})


// THUNK ACTIONS

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

function initiatePublish() {
  return (dispatch, getState) => {
    const state = getState()
    const {web3, currentAccount} = state.app
    const addresses = Object.keys(state.create.addresses).map(id =>
      state.create.addresses[id].value
    )
    const splitit = new SplitIt(web3, currentAccount)
    splitit.publish(addresses)
    .then(newAddress => {
      console.log(newAddress)
      alert(`Your new SplitIt contract address is: ${newAddress} (copy and save it!)`)
    }).catch(err => console.log(err))
  }
}


// ACTION EXPORTS

export const actions = {
  openPublishModal,
  closePublishModal,
  addAddress,
  removeAddress,
  unlockAddress,
  updateAddressAndValidate,
  initiatePublish,
  updateTipAmount
}


export const addressStates = {
  INITIAL_INPUT: 'INITIAL_INPUT',
  LOCKED_INPUT: 'LOCKED_INPUT',
  EDITING_INPUT: 'EDITING_INPUT'
}


// INITIAL STATE

const initialState = {
  isDisposable: false,
  publishModalIsOpen: false,
  tipAmount: 0.0,
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
      delete addresses[action.id]
      const isDisposable = Object.keys(addresses).length > 2 ? true : false
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
    case OPEN_PUBLISH_MODAL: {
      return Object.assign({}, state, {publishModalIsOpen: true})
    }
    case CLOSE_PUBLISH_MODAL: {
      return Object.assign({}, state, {publishModalIsOpen: false})
    }
    case UPDATE_TIP_AMOUNT: {
      return Object.assign({}, state, {tipAmount: action.amount})
    }
    default: {
      return state
    }
  }
}
