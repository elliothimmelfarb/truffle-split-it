import styled from 'styled-components'

import colors from '../styles/colors'

export const AddressContainer = styled.div`
  display: flex;
  height: 65px;
  width: 100%;
  max-width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: ${
    props => props.isdark ? `${colors.address_bg_dark}` : `${colors.address_bg_light}`
  };
`
export const AddressInnerContainer = styled.div`
  display: flex;
  flex: 1 0;
  max-width: 98%;
  max-width: 100vw;
  height: 100%;
  align-items: center;
  margin: 5px;
  justify-content: space-around;
`
export const InputContainer = styled.div`
  flex: 20 0;
  display: flex;
  align-items: center;
  height: 100%;
`
export const ButtonContainer = styled.div`
  flex: 1 0;
  display: flex;
  height: 60%;
  align-items: center;
  justify-content: flex-end;
`
export const Input = styled.input`
  height: 60%;
  flex: 1 0;
  font-size: 13px;
  border-radius: ${
    props => props.flatEdge ?
    '5px 0 0 5px' :
    '5px'
  };
  padding: 0 5px;
  border: 1px solid ${
    props => props.isempty ?
    'grey' : props.isvalid ?
    'green' : 'red'
  };
`
export const InputConfirmButton = styled.div`
  display: flex;
  width: 60px;
  height: 100%;
  text-align: center;
  background-color: ${props => props.isvalid ? colors.button_background : colors.button_disabled_bg};
  justify-content: center;
  align-items: center;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${colors.button_stroke};
  border-left: none;
  padding-left: 0px;
  color: ${colors.button_content};
  cursor: pointer;
  &:hover {
    background-color: #326E9C;
  }
`
export const LockedInput = styled.div`
  display: flex;
  flex: 5 0;
  max-width: 70vw;
  height: 80%;
  align-items: center;
  color: ${colors.default_text};
  font-size: 13px;
  padding-left: 5px;
`
export const LockedInputText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  color: grey;
  font-size: 1.2em;
`
