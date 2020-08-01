import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux';

import io from 'socket.io-client'

const ENDPOINT = "/";
let socket = ''

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesLoading: false,
      messages: [],

      focus: {},

      isTyping: false,
      chatMessage: '',
      colorOption: '',
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const self = this;
    socket = io(ENDPOINT);

    self.setState({
      messagesLoading: true
    })

    socket.on('connect', () => {
      console.log("Connected to server!"); // true
    });

    axios.post('/api/getUserMessages', {
      _id: self.props.user_id
    })
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({

        // Set Ads
        messages: response.data,

      }, () => {
        // const messagesCopy = self.state.messages

        // messagesCopy.splice(1, 0, {
        //   promotional: true,
        //   sender: 'Burger King',
        //   subject: <span className="badge badge-danger">Ad</span>,
        //   message: '<img src="https://1.bp.blogspot.com/-Vx5R6qB1Aus/XQJGW8egVlI/AAAAAAABF_k/aVq1NlnzvOkJZ18VYFZYRP3COXVkdJavACLcBGAs/s1600/burger-king-whopper-meal-deals.jpg"></img>'
        // })
        
        self.setState({
          // messages: messagesCopy,
          messagesLoading: false
        })
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  setFocus(message) {
    const self = this;

    this.setState({focus: message}, 
      () => {
        socket.emit( 'join-room', self.state.focus._id )

        socket.on(self.state.focus._id, function(msg){
          console.log('incoming message');

          self.setState({
            focus: {
              ...self.state.focus,
              messages: [
                ...self.state.focus.messages,
                {
                 date: moment._d,
                 message: msg,
                 sender: 'TBD'
                }
              ]
            }
          })
        });
      }
    )

    // socket.emit('join', this.state.focus._id);

  }

  // renderContentBackground(color) {

  //   // This is here because if the user has dark mode selected then display should be different

  //   switch(color) {
  //     case 'gradientBlue':
  //       return()
  //     case y:
  //       // code block
  //       break;
  //     default:
  //       // code block
  //   }

  // }

  sendMessage() {
    const self = this;

    if ( this.state.focus._id === undefined ) {
      console.log("This should not happen");
    } else {

      axios.post('/api/chatMessage', {
        chat_id: self.state.focus._id,
        user_id: self.props.user_id,
        message: self.state.chatMessage
      })
      .then(function (response) {
        console.log(response.data);

        // socket.to(self.state.focus._id).emit(self.state.chatMessage);

        socket.emit(self.state.focus._id, self.state.chatMessage);

        self.setState({
          focus: {
            ...self.state.focus,
            messages: [
              ...self.state.focus.messages,
              {
               date: 'Today',
               message: self.state.chatMessage,
               sender: self.props.user_id
              }
            ]
          },
          chatMessage: ''
        })

      })
      .catch(function (error) {
        console.log(error);
      });

    }

  }

  render() {

    const { focus } = this.state;

    return (
      <div className="email-page background">
        
        <div className="nav-bar-sticker">
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>

        <div onClick={() => this.setFocus({})} className="page-note">Mesh - BETA</div>

        <div className="dashboard">
          <div className="inbox-messages">

            <div className="current-spotlight px-4 py-2 d-flex justify-content-between align-items-center">
              <div>Inbox - {this.state.messages.length}</div>
              <div><i className="far fa-plus-square"></i></div>
            </div>

            {this.state.messagesLoading ? 
              <div className="loading-block">
                <div>
                  <i class="fas fa-spinner fa-spin"></i>
                  Loading
                </div>
              </div>
              :
              this.state.messages.map(message => 
                (
                  <div onClick={() => this.setFocus(message)} className={"inbox-message " + (message.promotional ? 'ad ' : '') + (message._id === focus._id ? 'active ' : '')} >

                    <div className="message-photo">
                      <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
                    </div>

                    <div className="message-content">

                      {message._id === focus._id ? 
                        <div className="active-bullet">
                          <div className="bullet"></div>
                        </div>
                        :
                        null
                      }

                      <div className="message-sender">
                        {message.group_message ? 
                        <div>
                          <div>Group</div>
                          <span>
                            {/* { message.users.map( (user) => <span className="badge badge-articles mr-1">{user}</span> ) } */}
                            { message.fetchedUsers.map( (user) => <span className={ "badge mr-1 " + ( user === "Deleted User" ? 'badge-danger' : 'badge-dark' ) }>{user}</span> ) }
                          </span>
                        </div> 
                        :
                        <div>
                          <div>Person</div>
                          <span>
                            {/* { message.users.map( (user) => <span className="badge badge-articles mr-1">{user}</span> ) } */}
                            { message.fetchedUsers.map( (user) => <span className="badge badge-dark mr-1">{user}</span> ) }
                          </span>
                        </div> 
                        }
                      </div>

                      <div className="message-subject">{message.subject}</div>
                    </div>
                  </div>
                )
              )
            }

            <div className="rooms">
              <h5>Your Rooms</h5>
              <div className="badge badge-primary">Real ID</div>
              <div className="badge badge-primary ml-1">Developers</div>
              <div className="badge badge-primary ml-1">Writers</div>
              <div className="badge badge-primary ml-1">Designers</div>
            </div>
            
          </div>

          <div className={"content " + this.state.colorOption}>

            <div className="header px-4 py-2">

              {focus.group_message ? 
              <div className="subject">Group Chat: {focus._id}</div>
              :
              <div className="subject">Personal Chat: {focus._id}</div>
              }
              
              {focus.sender === undefined ?
                null
                :
                <i class="far fa-trash-alt fa-2x mr-0"></i>
              }
            </div>

            <div className={"chat-messages p-3"}>

              {focus._id === undefined ?

              <div className="welcome-page">
                <div>Hello {this.props.user_details.first_name}</div>
                <div className="card">
                  <div>2 New Messages!</div>
                </div>
                <small>Last m</small>
              </div>

              :
              // <div dangerouslySetInnerHTML={{__html: focus.message}}></div>
              focus.messages.map((message) => (
                message.sender === this.props.user_id ? 
                  <div className="chat-message mb-3 personal">
                    <div className="sender">You</div>
                    <div className="message">{message.message}</div>
                    <div className="date">{message.date}</div>
                  </div>
                  :
                  <div className="chat-message mb-3">
                    <div className="sender">{message.sender}</div>
                    <div className="message">{message.message}</div>
                    <div className="date">{message.date}</div>
                  </div>
              ))}

              {Object.keys(focus).length === 0 || focus.promotional === true ?
                null
                :
                <div className="response mt-5">

                  <div className="label">Reply:</div>

                  <div className="input-wrap">
                    <textarea className="" id="chatMessage" name="chatMessage" value={this.state.chatMessage} onChange={(e) => this.handleChange(e)} type="text"/>
                    <div onClick={() => this.sendMessage()} className="icon-wrap"><i class="far fa-paper-plane mr-0"></i></div>
                  </div>

                  <div className="security-status w-100 d-flex justify-content-between align-items-center">

                    <div>
                      <i class="fas fa-lock-open"></i>
                      <span>This chat is not encrypted</span>
                    </div>

                    <span className="badge badge-light">Options</span>

                  </div>
                </div>
              }

              <div className="color-options d-flex justify-content-between align-items-center">
                <span className="label">Chat Color</span>
                <div>
                  <ColorOption realThis={this} name="gradientBlue"/>
                  <ColorOption realThis={this} name="gradientGreen"/>
                  <ColorOption realThis={this} name="gradientRed"/>
                  <ColorOption realThis={this} name="gradientYellow"/>
                  <ColorOption realThis={this} name="gradientPurple"/>
                </div>
              </div>

            </div>            

          </div>

          <div className="ad"></div>
        </div>

      </div>
    )
  }
}

const ColorOption = (props) => {
  return (
    <div onClick={() => props.realThis.setState({colorOption: props.name})} className={"option " + props.name}></div>
  )
};

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.id,
    user_details: state.auth.user_details
  };
};

export default connect(
  mapStateToProps
)(Messages );