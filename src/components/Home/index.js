import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => (
  <>
    <div className="new-home">
      <div className="new-home-background"></div>

      <div className="new-home-text">
        <h1>Welcome Joey,</h1>
        <p>Heres a glance at what's going on.</p>
      </div>

      <div className="new-home-bar">
        {/* <input type="text"/> */}
      </div>

    </div>

    <div className='container home-container'>
      <div className='row'>
        <div className='col-12 col-md-8'>

          <div className="home">
            {/* <h1>Home</h1>
            <p>Quick glance at everything going on,</p> */}

            <SimpleSlider/>

            <div className="design-section mb-2">
              <h1>Story Updates</h1>
              <p>The Home Page is accessible by every signed in user.</p>
          
              <div className="design-section-items">
                <div className="row">
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                </div>
              </div>
            </div>

            <div className="orders-section mb-3">
              <h1>Current Orders</h1>
              <p>Orders that are ongoing display here</p>
          
              <div className="orders-section-items">
                <div className="row">
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                </div>
              </div>
            </div>

            <div className="design-section mb-2">
              <h1>Design Submissions</h1>
              <p>If a user has submitted designs to the store those details will be here</p>
          
              <div className="design-section-items">
                <div className="row">
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col mb-3">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="item">
                      <div className="photo"></div>
                    </div>
                  </div>
    
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className='col-12 col-md-4'>

          <div className="chat-wrapper">
            <Messages />
          </div>

          {/* <Newsletter/> */}

        </div>
      </div>
    </div>
  </>
);

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: 0,
      activeSlide: 0,
    };
  }

  componentDidMount() {
    this.setState({slides: document.querySelectorAll('.slick-slide:not(.slick-cloned)').length})
  }

  render() {
    const settings = {
      focusOnSelect: true,
      dots: true,
      centerMode: false,
      infinite: false,
      centerPadding: "100px",
      slidesToShow: 3,
      arrows: false,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      speed: 250,
    };
    return (
      <div className="story-updates my-5">
        <div className="dual-header slide-row-title">
          <span className="right">News Updates</span>
          <span className="left">Item {this.state.activeSlide + 1} out of {this.state.slides}</span>
        </div>

        <Slider {...settings}>

          <div className="slick-card">
            <h3>1</h3>
            <h5>Flint Michigan</h5>
            <h5>2 Updates</h5>
            <h5>Mild</h5>
          </div>

          <div className="slick-card">
            <h3>2</h3>
            <h5>Panama Papers</h5>
            <h5>1 Update</h5>
            <h5>Critical</h5>
          </div>

          <div className="slick-card">
            <h3>3</h3>
            <h5>MTA</h5>
            <h5>1 Update</h5>
            <h5>Fair Increse</h5>
          </div>

          <div className="slick-card">
            <h3>4</h3>
            <h5>Edward Snowden</h5>
            <h5>3 Updates</h5>
            <h5>Interesting</h5>
          </div>

          <div className="slick-card">
            <h3>5</h3>
            <h5>Gun Laws</h5>
            <h5>New Law</h5>
            <h5>NY</h5>
          </div>

          <div className="slick-card">
            <h3>6</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>

        </Slider>
      </div>
    );
  }
}

// class Newsletter extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {

//     }
//   }

//   render() {
//     return (
//       <h1>Newsletter</h1>
//     )
//   }
// }

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 10,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages() {
    this.setState({ loading: true });

    this.props.firebase
    .messages()
    .orderByChild('createdAt')
    .limitToLast(this.state.limit)
    .on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
        }));
        this.setState({
          messages: messageList,
          loading: false,
        });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  getUsername = uid => {
    this.props.firebase.user(uid).once('value').then(snapshot => {
      var name = snapshot.val().username
      console.log(name)
      return "Hello"
    })
  }

  

  render() {
    const { text, messages, loading } = this.state;

    return (

      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <div className="dual-header">
                <div>Showing last {this.state.limit} messages.</div>
                

                <button className="btn show-more" type="button" onClick={this.onNextPage}>
                  More
                </button>

                {/* <div>Name:{this.getUsername('1kgzHcDlDJbBVppJlVXqpsgvhAa2')}</div> */}

              </div>
            )}
            {loading && <div>Loading ...</div>}

            {messages ? (
            <MessageList 
              authUser={authUser}
              messages={messages}
              onEditMessage={this.onEditMessage}
              onRemoveMessage={this.onRemoveMessage}
            />
            ) : (
            <div>There are no messages ...</div>
            )}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>

              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
                className="message-input"
              />
              <button className="btn submit-input" type="submit">Send</button>

            </form>
          </div>
        )}
      </AuthUserContext.Consumer>

    );
  }
}

const MessageList = ({ authUser, messages, onEditMessage, onRemoveMessage }) => (
  <ul className="message-list">
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        key={message.uid} 
        // name={this.props.firebase.user(message.uid).username} 
        message={message} 
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
        />
    ))}
  </ul>
);

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    editMode: false,
    editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  getUsername = uid => {
    this.props.firebase.user(uid).once('value').then(snapshot => {
      var name = snapshot.val().username
      console.log(name)
      return "Hello"
    })
  }

  render() {
    const { name, authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;
    return (
      <li>
        {editMode ? (
        <input
          type="text"
          value={editText}         
          onChange={this.onChangeEditText}
        />
        ) : (
        <span>
          {/* <strong>Name: {name}</strong> */}
          <strong onClick={() => (this.getUsername('EWHLHSvY4OROIHdzsZWKPqwpI322'))} className="user-message">{message.userId}</strong>
        </span>
        )}

        {authUser.uid === message.userId && (
        <span>
        {editMode ? (
        <span>
        <button className="btn save-message" onClick={this.onSaveEditText}>Save</button>
        <button className="btn reset-message" onClick={this.onToggleEditMode}>Reset</button>
        </span>
        ) : (
          <button className="btn edit-message" onClick={this.onToggleEditMode}>Edit</button>
          )}
          {!editMode && (

          <button
            type="button"
            className="btn delete-message"
            onClick={() => onRemoveMessage(message.uid)}
            >
            Delete
          </button>

          )}
          </span>
          )}

        {editMode ? (
        <input
          type="text"
          value={editText}         
          onChange={this.onChangeEditText}
        />
        ) : (
        <span>
          <span className="content-message">{message.text}</span>
          {message.editedAt && <span>(Edited)</span>}
        </span>
        )}

      </li>
    );
  }

}

const condition = authUser => !!authUser;

const Messages = withFirebase(MessagesBase);

export default compose(
withEmailVerification,
withAuthorization(condition),
)(HomePage);