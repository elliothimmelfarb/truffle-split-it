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

const TOGGLE_ADDRESS_LOCKED_STATE = 'create/TOGGLE_ADDRESS_LOCKED_STATE'
const toggleAddressLockedState = (id) => ({
  id,
  type: TOGGLE_ADDRESS_LOCKED_STATE,
})

const UPDATE_ADDRESS_VALUE = 'create/UPDATE_ADDRESS_VALUE'
const updateAddressValue = (id, value) => ({
  id,
  value,
  type: UPDATE_ADDRESS_VALUE,
})



// THUNK ACTIONS



// ACTION EXPORTS

export const actions = {
  addAddress,
  removeAddress,
  toggleAddressLockedState,
  updateAddressValue,
}


// INITIAL STATE

const initialState = {
  addresses: {
    [shortid.generate()]: {
      value: '',
      isLocked: false,
      isValid: false,
    },
    [shortid.generate()]: {
      value: '',
      isLocked: false,
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
          isLocked: false,
          isValid: false,
        }
      }
      return Object.assign({}, state, {addresses})
    }
    case REMOVE_ADDRESS: {
      const addresses = {...state.addresses}
      delete addresses[action.id]
      return Object.assign({}, state, {addresses})
    }
    case TOGGLE_ADDRESS_LOCKED_STATE: {
      const addresses = {...state.addresses}
      addresses[action.id].isLocked = !addresses[action.id].isLocked
      return Object.assign({}, state, {addresses})
    }
    case UPDATE_ADDRESS_VALUE: {
      const addresses = {...state.addresses}
      addresses[action.id].value = action.value
      return Object.assign({}, state, {addresses})
    }
    default: {
      return state
    }
  }
}
