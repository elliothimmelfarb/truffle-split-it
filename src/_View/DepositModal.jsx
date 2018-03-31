import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'

import SplitIt from '../utils/splitit'
import {
  BaseButtonBlue,
} from '../components/TopLevelComponents.styled'
import {
  Input
} from '../components/AddressInputComponents.styled'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  content : {
    flex: '1 0',
    maxWidth: '900px',
    maxHeight: '90%',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'stretch',
    border: 'none',
    margin: '0 auto'
  }
};

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


Modal.setAppElement('#root');

class DepositModal extends React.Component {
  static propTypes = {
    modalIsOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    targetAddress: PropTypes.string.isRequired,
    web3: PropTypes.object.isRequired,
    currentAccount: PropTypes.string.isRequired,
  }

  static defaultProps = {
    modalIsOpen: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      tipAmount: 0,
      depositAmount: 0,
    }
  }

  handleDeposit = () => {
    const { web3, currentAccount, targetAddress } = this.props
    const { tipAmount, depositAmount } = this.state
    const amount = parseFloat(tipAmount) + parseFloat(depositAmount)
    const splitit = new SplitIt(web3, currentAccount)
    splitit.deposit(targetAddress, amount)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        style={customStyles}
        onRequestClose={this.props.closeModal}
      >
        <h2>Deposit</h2>
        <DisplayContainer>
          <InputPrompt>
            Tip the Devs?
          </InputPrompt>
          <InputContainer>
            <ModifiedInput
              type="number"
              onChange={e => this.setState({tipAmount: e.target.value})}
              placeholder="0.0"
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
              onChange={e => this.setState({depositAmount: e.target.value})}
              placeholder="0.0"
              isvalid
            />
            ETH
          </InputContainer>
        </DisplayContainer>
        <br />
        <DisplayContainer>
          Tip Amount: {this.state.tipAmount} ETH
        </DisplayContainer>
        <DisplayContainer>
          Deposit Amount: {this.state.depositAmount} ETH
        </DisplayContainer>
        <DisplayContainer>
          Total: {
            parseFloat(this.state.depositAmount) + parseFloat(this.state.tipAmount)
          } ETH
        </DisplayContainer>
        <DepositButton
          onClick={this.handleDeposit}
        >
          Initiatate Deposit
        </DepositButton>

      </Modal>
    )
  }
}

export default DepositModal
