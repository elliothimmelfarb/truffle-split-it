import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Container,
} from '../components/TopLevelComponents.styled';

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
  background-color: #F0F0F0;
`

export const Headline = styled.h1`
  color: black;
  text-align: center;
  padding: 1% 10%;
`

export const IntroContainer = styled.div`
  display: block;
  justify-content: left;
  align-items: center;
  padding: 1% 4%;
  background-color: #F8F8F8;
`

export const HowToContainer = styled.div`
  display: block;
  justify-content: left;
  align-items: center;
  padding: 1% 4%;
  background-color: #F0F0F0;
`

export const Paragraph = styled.p`
  font-size: large;
`

export const SubHeadline = styled.h4`
  font-size: large;
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


          <IntroContainer>
            <Paragraph>This web app enables you to visually (instead of by code) create, and then interact with, your very own ethereum smart contract.  The smart contract splits the ether it receives among your chosen addresses.</Paragraph>
            <SubHeadline>Example Use Cases</SubHeadline>
            <ul>
              <li>Use your smart contract as a payment address to split payments among the people who built the product.</li>
              <p>Instead of relying on a payroll department... and weeks of delay, you'll get paid your share as soon as payment is received.  This allows for teams, especially virtual ones, to work together with little to no overhead.</p>
              <li></li>
            </ul>
            <Paragraph>Split It is best used among ethereum user accounts.  While it can be used with other smart contracts, it is not recommended for casual users because you must really understand what you are doing to avoid complications.</Paragraph>
          </IntroContainer>
          <HowToContainer>
            <h2>How To Create Your First Contract</h2>
            <p>There are two tabs in Split It: (1) a tab for creating a contract, and (2) a tab for viewing and interacting with an already created contract.</p>
            <p>If you would like to see an already existing contract view this one [link].</p>
            <p>Otherwise you can create your own.</p>
          </HowToContainer>
        </AboutContainer>
      </Container>
    );
  }
}

export default About;
