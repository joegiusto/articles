import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

class Chat extends Component {
  render(props) {
    return(

      <div style={{height: '100vh', marginTop: '-50px'}} className="container">
        <div className="row h-100 justify-content-center">

          {/* <div className="col-12 my-auto">
            <div className="bg-dark">
              <h1>Next Event: Tuesday</h1>
            </div>
          </div> */}

          <div className="col my-auto">
            Online List
            
            <AuthUserContext.Consumer>
              {authUser => 
                <OnlineList authUser={authUser}/>
              }
            </AuthUserContext.Consumer>
          </div>

          <div className="col my-auto">

            <div className="chat-wrapper">

              <Messages />

              <AuthUserContext.Consumer>
                {authUser => 
                  <OnlineLog authUser={authUser}/>
                }
              </AuthUserContext.Consumer>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

class OnlineListBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
      test: 'test'
    }

    this.takeOffList = this.takeOffList.bind(this);
  }

  addID(uid) {
    var newArray = this.state.list.concat(uid)
    this.setState({list: newArray})
  }

  componentDidMount() {
    console.log('Getting online players');

    this.props.firebase.onlineList().on('value', snapshot => {

      const listArray = snapshot.val();

      console.log(listArray);

      this.setState({list: listArray});

      if (listArray) {

        const listClean = Object.keys(listArray).map(key => ({
          ...listArray[key],
          uid: key,
        }));

        this.setState({
          messages: listClean,
          loading: false,
        });

      } else {

        // this.setState({ messages: null, loading: false });

      }

      // snapshot.forEach(function(data) {
      //   // console.log("The " + data.key + " score is " + data.val() );
      //   this.addID(data.val);
      // });

    });
  }

  takeOffList(uid) {
    console.log('works');
    this.props.firebase.onlineList().once('value', snapshot => {

      const listArray = snapshot.val();

      console.log(listArray);

      // this.setState({list: listArray});

      if (listArray) {

        // const listClean = Object.keys(listArray).map(key => ({
        //   ...listArray[key],
        //   uid: key,
        // })
        // );

        // this.setState({
        //   messages: listClean,
        //   loading: false,
        // });

      } else {

      }

      snapshot.forEach(function(data) {
        console.log("The " + data.key + " score is " + data.val() );
        // this.addID(data.val);

        console.log(data.val() + 'vs' + uid)

        if (data.val() === uid) {
          // this.props.firebase.onlineList().child(data.key).remove();
          // this.takeOffline(data.key);
        }

      });

      this.props.firebase.onlineList().child(0).remove();

    });

    // this.props.firebase.onlineList()
  }

  // takeOffline(key) {
  //   console.log("Called");
  //   this.props.firebase.onlineList.child(key).remove();
  // }

  componentWillUnmount() {
    this.props.firebase.onlineList().off();
  }

  render () {
    return (
      <ul>
        <button className="btn btn-dark btn-sm" onClick={() => this.takeOffList(this.props.authUser.uid)} >Take Off</button>
        {this.state.list ? this.state.list.map((id) => (<li>{id}</li>)) : ''}       
      </ul>
    )
  }
}

class OnlineLogBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: true,
      test: '',
      count: 1
    };
  }

  componentDidMount() {
    this.logOn();
  };

  componentWillUnmount() {
    this.logOff()
  }

  logOn() {
    this.props.firebase.onlineList().set([this.props.authUser.uid]);

    this.props.firebase
    .online(this.props.authUser.uid)
    .set(true);

    this.props.firebase
    .online(this.props.authUser.uid)
    .on('value', snapshot => {
      const status = snapshot.val();
      this.setState({online: status})
    });
  }

  logOff() {
    this.props.firebase
    .online(this.props.authUser.uid)
    .set(false);

    this.props.firebase
    .online(this.props.authUser.uid)
    .off();
  }

  render() {
    return (
      <div>
        {(
          this.state.online ? 
          <span className="ml-1 badge badge-success">Online</span>
          :
          <span className="ml-1 badge badge-danger">Offline</span>
        )}

        <span className="ml-1 badge badge-articles">{this.state.count} Now</span>

        {(
          this.state.online ? 
          <span onClick={() => this.logOff()} className="ml-1 badge badge-danger">Log Off</span>
          :
          <span onClick={() => this.logOn()} className="ml-1 badge badge-success">Log On</span>
        )}


        {/* <span className="ml-1 badge badge-dark">12 Today</span> */}

      </div>
    )
  }

}


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
            {/* <OnlineLogBase authUser={authUser}/> */}
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

  // getUsername = uid => {
  //   this.props.firebase.user(uid).once('value').then(snapshot => {
  //     var name = snapshot.val().username
  //     console.log(name)
  //     return "Hello"
  //   })
  // }

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
          <strong className="user-message">{message.userId}</strong>
          {/* onClick={() => (this.getUsername('EWHLHSvY4OROIHdzsZWKPqwpI322'))} */}
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
const OnlineLog = withFirebase(OnlineLogBase);
const OnlineList = withFirebase(OnlineListBase);

export default compose(
// withEmailVerification,
withAuthorization(condition),
)(Chat);