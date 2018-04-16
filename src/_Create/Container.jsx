import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import AddressesPane from './AddressesPane'
import PublishModal from './PublishModal'
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
  width: 90px;
  height: 60%;
  font-size: .8em;
`

class Create extends Component {

  static propTypes = {
    isConnected: PropTypes.bool,
    currentAccount: PropTypes.string,
    openPublishModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isConnected: false,
    currentAccount: '0x',
  }

  getAddressCount = () => {
    return Object.keys(this.state.addresses).length
  }

  render() {
    const {
      isConnected,
      openPublishModal,
      currentAccount,
    } = this.props

    return (
      <Container>
        <PaddingContainer>
          {
            !isConnected ?
              <NotConnectedPane>
                Not Connected to the Ethereum Network
              </NotConnectedPane> : currentAccount === '' ?
                <NotConnectedPane>
                  No Account
                </NotConnectedPane> : ''
          }
          <TopArea>
            <PageTitle>Create Split It Contract</PageTitle>
            <PublishButton
              disabled={ !isConnected }
              onClick={ openPublishModal }
            >
              Publish
            </PublishButton>
          </TopArea>
          <PublishModal />
          <ContentArea>
            <AddressesPane />
          </ContentArea>
        </PaddingContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.app.isConnected,
  currentAccount: state.app.currentAccount,
})

const mapDispatchToProps = dispatch => ({
  openPublishModal: () => dispatch(actions.openPublishModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
