
const SET_WEB3_SUCCESS = 'app/SET_WEB3_SUCCESS'
const setWeb3Success = (web3) => ({
  web3,
  type: SET_WEB3_SUCCESS,
})

export const constants = {
  SET_WEB3_SUCCESS,
}

export const actions = {
  setWeb3Success
}

const initialState = {
  web3: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_WEB3_SUCCESS: {
      return Object.assign({}, state, {web3: action.web3})
    }
    default: {
      return state
    }
  }
}
