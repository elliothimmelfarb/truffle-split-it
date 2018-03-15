import React, { Component } from 'react';
import {
  Container,
  PaddingContainer,
  TopArea,
  PageTitle,
  BaseButtonBlue,
  ContentArea,
  NotConnectedPane,
} from '../components/TopLevelComponents'

class About extends Component {
  render() {
    return (
      <Container>
        <PaddingContainer>
          <TopArea>
        <PageTitle>Create your own smart contract that will split ether between up to 10 ethereum user accounts.</PageTitle>
          </TopArea>

          <ContentArea>
            <p>This is content</p>
          </ContentArea>
      </PaddingContainer>
    </Container>
    );
  }
}

export default About;
