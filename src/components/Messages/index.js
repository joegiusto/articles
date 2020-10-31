import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import io from 'socket.io-client'

const ENDPOINT = "/";
let socket = ''

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Settings</Popover.Title>
    <Popover.Content>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="mr-3">Encrypt Chat</div>
        <div>
          <button className="btn btn-sm btn-articles-light">
            Encrypt
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="mr-3">Mute Chat</div>
        <div>
          <button className="btn btn-sm btn-articles-light">
            Yes
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="mr-3">Delete Chat</div>
        <div>
          <button className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </Popover.Content>
  </Popover>
);

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesLoading: false,
      messages: [],

      inboxFilter: 'people',
      focus: {},

      createChatOverlay: false,

      scrollPosition: 0,
      isTyping: false,

      sidebarVisible: false,
      settingsOpen: false,

      chatMessage: '',
      image: '',
      imageFile: '',

      colorOption: '',
    }

    this.myScrollRef = React.createRef()
    this.onImageUpload = this.onImageUpload.bind(this);
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
    // window.addEventListener('scroll', this.listenToScroll)
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
          messagesLoading: false,
          focus: self.state.messages[0]
        }, () => {
          self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
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
    // window.removeEventListener('scroll', this.listenToScroll)
  }

  onImageUpload(e) {
    const self = this;
    console.log(e.target.files);

    self.setState({
      imageFile: e.target.files[0],
      image: URL.createObjectURL(e.target.files[0])
    });
  }

  scrollToBottom() {
    const self = this;
    self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
  }

  listenToScroll = (e) => {

    const winScroll =
      e.currentTarget.scrollTop
  
    const height =
      e.currentTarget.scrollHeight -
      e.currentTarget.clientHeight
  
    const scrolled = winScroll / height
  
    this.setState({
      scrollPosition: scrolled,
      // theheight: winScroll
    })

  }

  setFocus(message) {
    const self = this;

    if ( message === {} ) {

      console.log("Ignore this one")
      this.setState({
        focus: message
      })

    } else {
      
      this.setState({focus: message}, 
        () => {

          this.setState({sidebarVisible: false})
          
          self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
  
          socket.emit( 'join-room', self.state.focus._id )
  
          socket.on(self.state.focus._id, function(msg){
  
            console.log('incoming message');
  
            let willScroll = false;
  
            if ( self.state.scrollPosition === 1 ) {
              willScroll = true
            }
  
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
            },
            () => { 

              // self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
  
              if ( willScroll === true ) {
                // console.log('willScroll was true')
                self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
              }
  
             }
            )
          });
        }
      )

    }

  }

  renderMessageContacts() {

    if (this.state.inboxFilter === 'people') {
      return (
        this.state.messages.map(message => 
          <div onClick={() => this.setFocus(message)} className={"chat-contact inbox-message " + (message.promotional ? 'ad ' : '') + (message._id === this.state.focus._id ? 'active ' : '')} >

            <div className="contact-photo">
              <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${ message.fetchedUsers.filter(user => user.id !== this.props.user_id).map(user => user.id) }.jpg`} alt=""/>
            </div>

            <div className="contact-body message-content">

              {message._id === this.state.focus._id ? 
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
                    { message.fetchedUsers.map( (user) => <span className={ "badge mr-1 " + ( user.name === "Deleted User" ? 'badge-danger' : 'badge-dark' ) }>{user.name}</span> ) }
                  </span>
                </div> 
                :
                <div>
                  <div className="contact-name"> { message.fetchedUsers.filter(user => user.id !== this.props.user_id).map(user => user.name) }</div>
                  <small>
                    {message.encryption === true ?
                    <span><i class="fas fa-lock"></i>Encrypted</span>
                    :
                    <span>Last message preview</span>
                    }
                  </small>
                  <span>
                    {/* { message.users.map( (user) => <span className="badge badge-articles mr-1">{user}</span> ) } */}
                    {/* { message.fetchedUsers.map( (user) => <span className="badge badge-dark mr-1">{user}</span> ) } */}
                  </span>
                </div> 
                }
              </div>

              {/* <div className="message-subject">{message.subject}</div> */}

            </div>
          </div>
        )
      ) 
    } 

    if (this.state.inboxFilter === 'newsletters') {
      return (
        <div className="newsletters">
          <div className="newsletters-card">
            You have not subscribed to any newsletters yet.
          </div>
        </div>
      ) 
    } 

    if (this.state.inboxFilter === 'rooms') {
      return (
        <div className="rooms">
          <div className="rooms-card">
            You are not a part of any rooms yet.
          </div>
          {/* <h5>Your Rooms</h5>
          <div className="badge badge-primary">Real ID</div>
          <div className="badge badge-primary ml-1">Developers</div>
          <div className="badge badge-primary ml-1">Writers</div>
          <div className="badge badge-primary ml-1">Designers</div> */}
        </div>
      ) 
    } 

    else {
      return(
        <div className="rooms">
          <div className="rooms-card">
            You are not a part of any rooms yet.
          </div>
          {/* <h5>Your Rooms</h5>
          <div className="badge badge-primary">Real ID</div>
          <div className="badge badge-primary ml-1">Developers</div>
          <div className="badge badge-primary ml-1">Writers</div>
          <div className="badge badge-primary ml-1">Designers</div> */}
        </div>
      )
    }
  }

  sendMessage() {
    const self = this;
    const data = new FormData();

    data.append('file', this.state.imageFile);
    data.append('chat_id', self.state.focus._id);
    data.append('message', self.state.chatMessage);

    // {
    //   chat_id: self.state.focus._id,
    //   message: self.state.chatMessage,
    //   imageFile: data
    // }

    if ( this.state.focus._id === undefined ) {
      console.log("This should not happen");
    } else {

      axios.post('/api/chatMessage', data)
      .then(function (response) {
        console.log(response.data);

        // socket.to(self.state.focus._id).emit(self.state.chatMessage);

        socket.emit(self.state.focus._id, self.state.chatMessage);

        let willScroll = false;

        if ( self.state.scrollPosition === 1 ) {
          willScroll = true
        }

        if (response.data.type === 'photo') {

          self.setState({
            focus: {
              ...self.state.focus,
              messages: [
                ...self.state.focus.messages,
                {
                 date: moment()._d,
                 message: '',
                 sender: self.props.user_id,
                 media: 'photo',
                 url: response.data.url
                }
              ]
            },
            chatMessage: '',
            image: '',
            imageFile: ''
          }, () => {
            if ( willScroll === true ) {
              self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
            }
          })

        } else {

          self.setState({
            focus: {
              ...self.state.focus,
              messages: [
                ...self.state.focus.messages,
                {
                 date: moment()._d,
                 message: self.state.chatMessage,
                 sender: self.props.user_id
                }
              ]
            },
            chatMessage: '',
            image: '',
            imageFile: ''
          }, () => {
            if ( willScroll === true ) {
              self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
            }
          })

        }

      })
      .catch(function (error) {
        console.log(error);
      });

    }

  }

  render() {

    const { focus } = this.state;

    return (
      <div className="messages-page">

        <div className={"start-chat-container " + (this.state.createChatOverlay ? 'visible' : '')}>

          <div onClick={() => this.setState({createChatOverlay: false})} className="start-chat-background"></div>

          <div className="start-chat card">

            <div className="card-header">
              Start Chat
            </div>

            <div className="card-body">

              <div className="form-group articles">
                <label for="new-chat-user-id">User's ID or Email Address</label>
                <input className="form-control with-label" name="new-chat-user-id" id="new-chat-user-id" type="text" value=""/>
              </div>

              <button className="btn btn-lg w-100 btn-articles-light">Start Chat</button>

            </div>

            <div className="card-footer">
              <small>Your User ID is <b>{this.props.user_id}</b> provide this to a friend to start a conversation.</small>
            </div>

          </div>

        </div>
        
        <div className={"nav-bar-sticker " + (this.props.sideMenuOpen ? '' : '')}>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>

        <div className="container-fluid">

          <div className="chat-card card my-4 mx-0 m-md-4">

            <div className="card-body d-flex p-0">

              <div className={"chat-sidebar " + (this.state.sidebarVisible ? 'expand' : '')}>
                {this.renderMessageContacts()}

                <div className="start-chat">
                  <button onClick={() => this.setState({createChatOverlay: true})} className="btn btn-articles-light">Start Chat</button>
                </div>
              </div>

              <div className={"chat-content " + (this.state.sidebarVisible ? '' : 'expand')}>

                <div onClick={() => this.setState({sidebarVisible: false})}  className={"content-darken " + (this.state.sidebarVisible ? 'visible' : '')}></div>

                <div className="content-header">
                  <div className="row justify-content-between align-items-center">

                    <div className="col-8 col-sm-8 d-flex align-items-center">

                      <button onClick={() => this.setState({sidebarVisible: true})} className="btn btn-articles-light d-md-none mr-3">
                        <i className="fas fa-chevron-left mr-0"></i>
                      </button>

                      <div className="min-w-0">
                        <div>{focus.fetchedUsers?.filter(user => user.id !== this.props.user_id).map(user => user.name)}</div>
                        <small>Active</small>
                      </div>

                    </div>

                    <div className="col-auto">

                    <OverlayTrigger trigger='click' rootClose placement="bottom" overlay={popover}>
                      <button className="btn btn-articles-light">
                        <i class="fas fa-cog mr-0"></i>  
                      </button>
                    </OverlayTrigger>

                    </div>

                  </div>
                </div>

                <div ref={this.myScrollRef} onScroll={(e) => this.listenToScroll(e)} className="content-body scrollbar">
                  
                  {focus.encryption === true ? 

                  <div className="chat-encryption-warning">

                    <div>This chat is encrypted, the user who started this chat set a password that you will need to decrypt the messages. This will have to be entered every time to ensure security. For best security obtain this password from the user in person so there is no digital record of it.</div>

                    <div style={{width: 'max-content'}} className="form-group d-inline-block articles mt-3">
                      <label for="password">Password</label>
                      <input className="form-control with-label" name="password" id="password" type="text" value=""/>
                    </div>

                    <button className="btn btn-articles-light">Enter</button>

                  </div>

                  :

                  focus.messages?.map((message) => (

                      <div className={"chat-message p-3 " + ( message.sender === this.props.user_id ? 'personal' : '' )}>

                        <div className={"message-photo " + ( message.sender === this.props.user_id ? 'd-none' : '' )}>
                          <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
                        </div>

                        <div className="message-details">

                          {message.media === undefined ?
                          <div className="message">{message.message}</div>
                          :
                          <img className="message photo" src={message.url} alt=""/>
                          }
                          

                          <div className="date">{moment(message.date).format("LLL")}</div>
                        </div>

                      </div>

                  ))}

                </div>

                <div className="content-send">

                  <div onClick={() => this.scrollToBottom()} className={"scroll-lock " + (this.state.scrollPosition === 1 ? 'active' : '')}>
                    Auto Scroll
                  </div> 

                  <div className={"thumbnail-container " + (this.state.image === '' ? 'd-none' : '')}>

                    <button onClick={() => this.setState({image: '', imageFile: ''})} className="btn btn-sm btn-danger remove">
                      <span><i class="far fa-window-close"></i>Remove</span>
                    </button>

                    <img id="thumbnail" src={this.state.image}/>

                  </div>

                  {this.state.image === '' ? 
                  <TextareaAutosize
                    className="chat-message" 
                    name="chatMessage"
                    value={this.state.chatMessage}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Type your message">
                  </TextareaAutosize>
                  : 
                  ''}                  

                  <div className="align-items-start">
                    <input className="d-none" onFocus={() => (this.props.changeFocus('photo'))} id="file-upload" onChange={this.onImageUpload} accept="image/x-png,image/gif,image/jpeg" type="file" name="myfile" />
                    <label for="file-upload" className="btn btn-sm btn-articles-light mb-0"><i class="fas fa-paperclip"></i>Attach</label>
  
                    <button disabled={this.state.chatMessage === '' && this.state.image === ''} className="btn btn-sm btn-articles-light" onClick={() => this.sendMessage()}><i className="far fa-paper-plane"></i>Send</button>
                  </div>

                </div>

              </div>

            </div>
          </div>

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
    user_details: state.auth.user_details,
    sideMenuOpen: state.site.sideMenuOpen
  };
};

export default connect(
  mapStateToProps
)(Messages );