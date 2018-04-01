import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import AddressesPane from './AddressesPane'
import SplitIt from '../utils/splitit'
import {
  Container,
  PaddingContainer,
  TopArea,
  PageTitle,
  BaseButtonBlue,
  ContentArea,
  NotConnectedPane,
} from '../components/TopLevelComponents.styled'
import {actions} from './Create.ducks'

const PublishButton = BaseButtonBlue.extend`
  width: 20%;
  height: 60%;
  font-size: .9em;
`

class Create extends Component {

  static propTypes = {
    web3: PropTypes.object,
    isConnected: PropTypes.bool,
    currentAccount: PropTypes.string,
  }

  static defaultProps = {
    web3: {},
    isConnected: false,
    currentAccount: '0x',
  }

  getAddressCount = () => {
    return Object.keys(this.state.addresses).length
  }

  handleAddAddress = () => {
    if (this.getAddressCount() > 9) return
    const id = shortid.generate()
    const addresses = { ...this.state.addresses }
    addresses[id] = {
      address: ''
    }
    this.setState({ addresses })
  }

  handlePublish = () => {
    const { web3, currentAccount } = this.props

    let { addresses } = this.state
    addresses = Object.keys(addresses).map(id =>
      addresses[id].address
    )

    const splitit = new SplitIt(web3, currentAccount)

    splitit.publish(addresses)
    .then(newAddress => {
      alert(`Your new SplitIt contract address is: ${newAddress} (copy and save it!)`)
    }).catch(err => console.log(err))
  }

  handleDelete = (id) => {
    if (this.getAddressCount() < 3) return
    const addresses = { ...this.state.addresses }
    delete addresses[id]
    this.setState({ addresses })
  }

  validateAddress = (address) => {
    const { web3 } = this.props
    return new Promise((resolve, reject) => {
      if (web3.utils.isAddress(address)) {
        web3.eth.getCode(address, (err, res) => {
          if (err) return reject(err)
          if (res.length > 3) return reject(res)
          resolve(res)
        })
      } else {
        reject()
      }
    })
  }

  render() {
    return (
      <Container>
        <PaddingContainer>
          {
            !this.props.isConnected ?
              <NotConnectedPane>
                Not Connected to the Ethereum Network
              </NotConnectedPane> :
              ''
          }
          <TopArea>
            <PageTitle>Create Split It Contract</PageTitle>
            <PublishButton
              disabled={ !this.props.isConnected }
              onClick={ this.handlePublish }
            >
              Publish
            </PublishButton>
          </TopArea>
          <ContentArea>
            <AddressesPane
              validateAddress={ this.validateAddress }
            />
          </ContentArea>
        </PaddingContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  web3: state.app.web3,
  isConnected: state.app.isConnected,
  currentAccount: state.app.currentAccount,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
