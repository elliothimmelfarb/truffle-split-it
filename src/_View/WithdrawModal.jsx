import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {connect} from 'react-redux'

import {
  BaseButtonBlue,
} from '../components/TopLevelComponents.styled'
import {
  Input,
} from '../components/AddressInputComponents.styled'
import {actions} from './View.ducks'
import Modal from '../components/Modal'


const DisplayContainer = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const InputPrompt = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-end;
  ${'' /* justify-content: center; */}
`
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3em;
`
const ModifiedInput = Input.extend`
  border-radius: 5px;
  font-size: 1.7em;
  max-width: 80%;
  flex: 1 1;
  margin-right: 5px;
`
const Withdraw = BaseButtonBlue.extend`
  padding: 10px;
`

class WithdrawModal extends React.Component {
  static propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    tipAmount: PropTypes.number,
    updateTipAmount: PropTypes.func.isRequired,
    withdraw: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tipAmount: 0.0,
  }

  render() {
    const {
      modalIsOpen,
      closeModal,
      tipAmount,
      updateTipAmount,
      withdraw,
    } = this.props

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2>Withdraw</h2>
        <DisplayContainer>
          <InputPrompt>
            Tip the Devs?
          </InputPrompt>
          <InputContainer>
            <ModifiedInput
              type="number"
              onChange={e => updateTipAmount(parseFloat(e.target.value))}
              placeholder={tipAmount}
              isvalid
            />
            ETH
          </InputContainer>
        </DisplayContainer>
        <DisplayContainer>
          Tip Amount: {tipAmount} ETH
        </DisplayContainer>
        <Withdraw
          onClick={withdraw}
        >
          Withdraw
        </Withdraw>

      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.view.withdrawModalIsOpen,
  targetAddress: state.view.targetAddress,
  tipAmount: state.view.tipAmount,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(actions.closeWithdrawModal()),
  updateTipAmount: (amount) => dispatch(actions.updateTipAmount(amount)),
  withdraw: () => dispatch(actions.withdraw())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawModal)
