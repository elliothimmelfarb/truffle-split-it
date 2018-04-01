import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Route,
  NavLink,
} from 'react-router-dom'
import {connect} from 'react-redux'

import getWeb3 from './utils/getWeb3'
import About from './_About/'
import View from './_View/'
import Create from './_Create/'
import colors from './styles/colors'
import {actions} from './app.ducks'

const AppContainer = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  height: 100vh;
  background-color: ${colors.container};
`
const RoutesContainer = styled.div`
  flex: 13 0;
  display: flex;
`
const Header = styled.header`
  display: flex;
  flex: 1 0;
  width: 100%;
  background-color: ${colors.navbar_bg};
  justify-content: space-between;
`
const Title = styled(NavLink)`
  display: flex;
  flex: 1.5 0;
  font-weight: 600;
  font-size: 1.6em;
  color: white;
  align-items: center;
  margin-left: 10px;
  text-decoration: none;
`
const NavButtonContainer = styled.div`
  display: flex;
  flex: 1 0;
`
const NavButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1 0;
  text-decoration: none;
  color: ${colors.navbar_text};
`
const activeStyle = {
  color: colors.navbar_selection_text,
  backgroundColor: colors.navbar_selection_bg,
}

class App extends Component {

  static propTypes = {
    connectToNet: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.props.connectToNet()
  }

  render() {
    return (
      <AppContainer>
        <Header>
          <Title
            exact
            to="/"
          >
            Split It
          </Title>
          <NavButtonContainer>
            <NavButton
              exact
              to="/create"
              activeStyle={ activeStyle }
            >
              Create
            </NavButton>
            <NavButton
              exact
              to="/view"
              activeStyle={ activeStyle }
            >
              View
            </NavButton>
          </NavButtonContainer>
        </Header>
        <RoutesContainer>
          <Route exact path="/" component={About}/>
          {/* <Route path="/create" render={() =>
            <Create
              web3={this.state.web3}
              isConnected={this.state.isConnected}
              currentAccount={this.state.currentAccount}
            />
            }/>
            <Route path="/view" render={() =>
            <View
              web3={this.state.web3}
              isConnected={this.state.isConnected}
              currentAccount={this.state.currentAccount}
            />
          }/> */}
        </RoutesContainer>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  connectToNet: () => dispatch(actions.connectToNet())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
