import getWeb3 from './utils/getWeb3'

// CONSTANT AND ACTION CREATOR PAIRS

const CONNECT_TO_NET_INITIATE = 'app/CONNECT_TO_NET_INITIATE'
const connectToNetInitiate = () => ({
  type: CONNECT_TO_NET_INITIATE,
})

const CONNECT_TO_NET_FAIL = 'app/CONNECT_TO_NET_FAIL'
const connectToNetFail = () => ({
  type: CONNECT_TO_NET_FAIL
})

const CONNECT_TO_NET_SUCCESS = 'app/CONNECT_TO_NET_SUCCESS'
const connectToNetSuccess = (payload) => ({
  payload,
  type: CONNECT_TO_NET_SUCCESS
})


// THUNK ACTIONS

function connectToNet() {
  return (dispatch) => {
    dispatch(connectToNetInitiate())
    const interval = window.setInterval(async () => {
      const results = await getWeb3
      if (!results) {
        return dispatch(connectToNetFail())
      }
      const { web3 } = results
      web3.eth.getAccounts((err, accs) => {
        if (!err && accs.length) {
          clearInterval(interval)
          const payload = {
            web3,
            currentAccount: accs[0]
          }
          console.log(web3)
          dispatch(connectToNetSuccess(payload))
        }
      })
    }, 100)
  }
}


// ACTION EXPORTS

export const actions = {
  connectToNet,

}


// INITIAL STATE

const initialState = {
  web3: null,
  attemptingConnection: false,
  isConnected: false,
  currentAccount: null,
}


// REDUCER

export default (state = initialState, action) => {
  switch(action.type) {
    case CONNECT_TO_NET_INITIATE: {
      return Object.assign({}, state, {attemptingConnection: true})
    }
    case CONNECT_TO_NET_FAIL: {
      return Object.assign({}, state, {attemptingConnection: true})
    }
    case CONNECT_TO_NET_SUCCESS: {
      console.log(action)
      return Object.assign({}, state, {
        attemptingConnection: false,
        isConnected: true,
        web3: action.payload.web3,
        currentAccount: action.payload.currentAccount,
      })
    }
    default: {
      return state
    }
  }
}
