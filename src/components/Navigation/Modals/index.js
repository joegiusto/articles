import React from 'react';
import Modal from 'react-modal';

const thread = {
  sale: {
    display: "15% Sale",
    title: "15% Sale",
    content: "All Originals in our store now 15% Off!"
  },
  alerts: {
    display: "",
    title: "",
    content: ""
  }
}

// const modalContent = [
  
//   {
//     // 0
//     message: "Hello!"
//   },
//   {
//     // 1
//     message: "All Originals in our store now 15% Off!"
//   },
//   {
//     // 2
//     message: "Example content of what would show up when a big story is developing. This component still needs to be styled and worked on. Putting this here for presentation/functionality purposes though."
//   },
//   {
//     // 3
//     message: "Hello!"
//   },
//   {
//     // 4
//     message: "Hello!"
//   }
// ]

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
        modalIsOpen: false,

        display: "",
        title: "",
        message: ""
      };
  
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount() {
      const threadName = this.props.thread;

      this.setState({
        display: thread[threadName].display,
        title: thread[threadName].title,
        content: thread[threadName].content
      });
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
  
            <button className="badge badge-black badge-shape-poly" onClick={this.openModal}>
              <span>{this.state.display}</span>
              <span className="badge badge-danger badge-sub-red ml-2">!</span>
            </button>
  
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}

                // TODO Remove this and figure out screenreader error 
                ariaHideApp={false}

                style={customStyles}
            >
                <button className="close-modal" onClick={this.closeModal}>X</button>
    
                <h2>
                  {this.state.title}
                </h2>
                
                <div>
                  {/* {modalContent[this.props.getContent].message} */}
                  {this.state.content}
                </div>
    
            </Modal>

        </div>
      );
    }
  }

  export {ReactModal}