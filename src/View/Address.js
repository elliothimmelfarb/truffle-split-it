import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  max-height: 80px;
  flex: 1 0;
  display: flex;
  align-items: center;
  color: white;
  border: 1px solid white;
`

class Address extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Container>
        { this.props.address }
      </Container>
    )
  }
}

export default Address
