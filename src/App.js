import React, { Component } from 'react';
import styled from 'styled-components'
import {
  Route,
  NavLink,
} from 'react-router-dom'
import getWeb3 from './utils/getWeb3'
import About from './About/'
import View from './View/'
import Create from './Create/'
import colors from './styles/colors'

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

  constructor(props) {
    super(props)

    this.state = {
      web3: {},
      isConnected: false,
      currentAccount: '',
    }

    this.connectToNetwork().then(() => console.log('Connected:', this.state))
  }

  connectToNetwork = () => {
    return new Promise((resolve, reject) => {
      const interval = window.setInterval(async () => {
        const results = await getWeb3
        if (!results) return console.error('Error finding web3.')
        const { web3 } = results
        const app = this
        web3.eth.getAccounts((err, accs) => {
          if (!err && accs.length) {
            clearInterval(interval)
            app.setState({
              web3,
              isConnected: true,
              currentAccount: accs[0]
            })
            resolve()
          }
        })
      }, 100)
    })
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
          <Route path="/create" render={() =>
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
          }/>
        </RoutesContainer>
      </AppContainer>
    );
  }
}

export default App;
