import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Container,
  PaddingContainer,
  TopArea,
  PageTitle,
  BaseButtonBlue,
  ContentArea,
  NotConnectedPane,
} from '../components/TopLevelComponents';

export const AboutContainer = styled.main`
  display: block;
  background-color: lightgray;
  width: 100%;
`
export const CoverContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #F8F8F8;
width: 100%;
height: 40vh;
`
export const CoverAnimation = styled.img`
flex-shrink: 0;
max-height: 100%;
max-width: 100%;
`

export const HeadlineContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: darkgray;
width: 100%;
`

export const Headline = styled.h1`
  color: black;
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
`

class About extends Component {
  render() {
    return (
      <Container>
        <AboutContainer>
          <CoverContainer>
            <CoverAnimation src="https://media.giphy.com/media/2UJahanu04M5G/giphy.gif"/>
          </CoverContainer>
          <HeadlineContainer>
          <Headline>Create your own ethereum smart contract that splits ether between multiple accounts.</Headline>
        </HeadlineContainer>
        </AboutContainer>
      </Container>
    );
  }
}

export default About;
