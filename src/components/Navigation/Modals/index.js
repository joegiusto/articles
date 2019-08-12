import React from 'react';
import Modal from 'react-modal';

const modalContent = [
  {
    // 0
    message: "Hello!"
  },
  {
    // 1
    message: "All Originals in our store now 15% Off!"
  },
  {
    // 2
    message: "Example content of what would show up when a big story is developing. This component still needs to be styled and worked on. Putting this here for presentation/functionality purposes though."
  },
  {
    // 3
    message: "Hello!"
  },
  {
    // 4
    message: "Hello!"
  }
]

const customStyles = {
    content : {
      top          : '50%',
      left         : '50%',
      right        : 'auto',
      bottom       : 'auto',
      marginRight  : '-50%',
      transform    : 'translate(-50%, -50%)',
      border       : 'initial',
      borderRadius : 'initial',
      maxWidth     : '600px',
      minWidth     : '600px',
      overflow     : 'initial'
    }
  };
  
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  // Modal.setAppElement('#yourAppElement')
  
  class ReactModal extends React.Component {
    constructor() {
      super();
  
      this.state = {
        modalIsOpen: false
      };
  
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
  
    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }
  
    render() {
      return (
        <div className="top-headline mx-1 d-inline">
  
            <button className="badge badge-black badge-shape-poly" onClick={this.openModal}>{this.props.message}<span className="badge badge-danger badge-sub-red ml-2">!</span></button>
            {/* <h3 className="top-headline mx-1 d-inline"><span className="badge badge-black badge-shape-poly ">15% Sale<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3> */}
            {/* <button style={{fontSize: "1.5rem"}} className="badge badge-black badge-shape-poly top-headline" onClick={this.openModal}>{this.props.message}</button> */}
  
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                // TODO Remove this and figure out screenreader error 
                ariaHideApp={false}
                // ENDTODO
                style={customStyles}
                // className="ReactModal__Content_Override"
                contentLabel="Example Modal"
            >
                <button className="close-modal" onClick={this.closeModal}>X</button>
    
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.message}</h2>
                
                <div>{modalContent[this.props.getContent].message}</div>
    
            </Modal>

        </div>
      );
    }
  }

  export {ReactModal, customStyles, modalContent }