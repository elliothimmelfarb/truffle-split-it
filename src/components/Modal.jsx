import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  content : {
    flex: '1 0',
    maxWidth: '900px',
    maxHeight: '90%',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'stretch',
    border: 'none',
    margin: '0 auto'
  }
};

ReactModal.setAppElement('#root');

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.array,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        style={customStyles}
        onRequestClose={this.props.onRequestClose}
      >
        { this.props.children }
      </ReactModal>
    )
  }
}

export default Modal
