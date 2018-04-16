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
const DepositButton = BaseButtonBlue.extend`
  padding: 10px;
`

class DepositModal extends React.Component {
  static propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    depositAmount: PropTypes.number,
    tipAmount: PropTypes.number,
    updateDepositAmount: PropTypes.func.isRequired,
    updateTipAmount: PropTypes.func.isRequired,
    deposit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tipAmount: 0.0,
    depositAmount: 0.0,
  }

  render() {
    const {
      modalIsOpen,
      closeModal,
      depositAmount,
      tipAmount,
      updateDepositAmount,
      updateTipAmount,
      deposit,
    } = this.props
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2>Deposit</h2>
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
        <br />
        <br />
        <DisplayContainer>
          <InputPrompt>
            How much to deposit?
          </InputPrompt>
          <InputContainer>
            <ModifiedInput
              type="number"
              onChange={e => updateDepositAmount(parseFloat(e.target.value))}
              placeholder={depositAmount}
              isvalid
            />
            ETH
          </InputContainer>
        </DisplayContainer>
        <br />
        <DisplayContainer>
          Tip Amount: {tipAmount} ETH
        </DisplayContainer>
        <DisplayContainer>
          Deposit Amount: {depositAmount} ETH
        </DisplayContainer>
        <DisplayContainer>
          Total: {
            parseFloat(depositAmount) + parseFloat(tipAmount)
          } ETH
        </DisplayContainer>
        <DepositButton
          onClick={deposit}
        >
          Initiatate Deposit
        </DepositButton>

      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.view.depositModalIsOpen,
  targetAddress: state.view.targetAddress,
  depositAmount: state.view.depositAmount,
  tipAmount: state.view.tipAmount,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(actions.closeDepositModal()),
  updateDepositAmount: (amount) => dispatch(actions.updateDepositAmount(amount)),
  updateTipAmount: (amount) => dispatch(actions.updateTipAmount(amount)),
  deposit: () => dispatch(actions.deposit())
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
