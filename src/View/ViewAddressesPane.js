import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1 0;
  border: 1px solid blue;
  border-radius: 5px;
`

class ViewAddressesPane extends React.Component {
  render() {
    return (
      <Container>
        ViewAddressesPane
      </Container>
    )
  }
}

export default ViewAddressesPane
