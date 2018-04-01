


// CONSTANT AND ACTION CREATOR PAIRS

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


// THUNK ACTIONS



// ACTION EXPORTS

export const actions = {
  closeDepositModal,
  updateDepositAmount,
  updateDepositTipAmount
}


// INITIAL STATE

const initialState = {
  depositModalIsOpen: false,
  targetAddress: '',
  depositAmount: 0.0,
  depositTipAmount: 0.0,
}


// REDUCER

export default (state = initialState, action) => {
  switch(action.type) {
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
    default: {
      return state
    }
  }
}
