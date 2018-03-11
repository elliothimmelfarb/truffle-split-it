import React from 'react'
import styled from 'styled-components'

import colors from '../styles/colors'

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
export const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  display: flex;
`
export const TopArea = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1;
  font-size: 1.2em;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const PageTitle = styled.div`
  display: flex;
  font-size: 1.15em;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: white;
`
export const BaseButtonBlue = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  color: ${colors.button_content};
  border: solid 1px ${colors.button_stroke};
  cursor: pointer;
  border-radius: 5px;
  background-color: ${
    props => props.disabled ?
    colors.button_disabled_bg :
    colors.button_background
  };
  @media (hover:none) {
    &:active {
      background-color: ${
        props => props.disabled ?
        colors.button_disabled_bg :
        '#326E9C'
      };
    }
  }
  @media (hover:hover) {
    &:hover {
      background-color: ${
        props => props.disabled ?
        colors.button_disabled_bg :
        '#326E9C'
      };
    }
  }
`
export const NotConnectedPane = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`
export const ContentArea = styled.div`
  flex: 12 1;
  display: flex;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  color: ${colors.default_text};
`
