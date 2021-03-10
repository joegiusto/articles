import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import qs from 'qs'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// import io from 'socket.io-client'

import * as ROUTES from '../../constants/routes';
import loadingGif from '../../assets/img/News/loading.gif'

import SocketContext from '../../utils/socket_context/context'

// TODO - Convert this to Hooks :) ? 

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesLoading: false,
      messages: [],

      inboxFilter: 'people',
      // focus: {},
      focusedChat: '',

      createChatOverlay: false,

      scrollPosition: 0,
      isTyping: false,

      sidebarVisible: false,
      settingsOpen: false,

      startChatMessage: '',
      startChatUser: '',
      startChatError: '',

      chatMessage: '',
      image: '',
      imageFile: '',

      lightboxOpen: false,
      lightboxFocus: '',

      colorOption: '',

      showMessagePreview: true,
      showOnlineActivity: true,
    }

    this.myScrollRef = React.createRef()
    this.onImageUpload = this.onImageUpload.bind(this);
    this.socket = this.props.socket;
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

  handleTextareaChange(e) {
    
    if ( e.key === "Enter" && !e.shiftKey ) {
      e.preventDefault();

      if (this.state.chatMessage !== '') {
        this.sendMessage();
      }
    }

  }

  componentDidMount() {
    const self = this;

    if (!this.props.auth) {
      this.props.history.push(ROUTES.SIGN_IN);
    }

    var query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if ( query.startMsg !== '' && query.startMsg !== undefined && query.startMsg !== null ) {
      console.log("Has content")
      console.log(query.startMsg)
      self.setState({
        createChatOverlay: true,
        startChatUser: query.startMsg
      })
    } else {
      console.log("Has no content")
    }

    // window.addEventListener('scroll', this.listenToScroll)
    // socket = io(ENDPOINT);

    self.setState({
      messagesLoading: true
    })

    this.socket.on('connect', () => {
      console.log("Connected to server!"); // true
    });

    this.socket.emit( 'online', self.props.user_id )

    axios.post('/api/getUserMessages', {
      _id: self.props.user_id
    })
    .then(function (response) {
      // console.log(response.data);

      self.setState({
        messages: response.data,
      }, () => {

        // self.setFocusedChat(self.state.messages.sort( self.messagesSort )[0]._id);
        // self.setFocus(self.state.messages[0])
        
        self.setState({
          messagesLoading: false,
          // focus: self.state.messages[0]
        }, () => {
        //   setTimeout(function(){ self.scrollToBottom(); }, 100);
        //   console.log( self.state.messages.find(m => m._id === self.state.focusedChat).fetchedUsers?.filter(user => user.id !== self.props.user_id).map(user => user.name) )
        })

      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });

    this.socket.on('message', function(msg){
  
      console.log(`Just received this message from server`);
      console.log(msg);
      console.log(`Will be adding message to ${msg.chat_id}`);

      let willScroll = false;

      if ( self.state.scrollPosition === 1 ) {
        willScroll = true
      }

      const messages = [...self.state.messages];
      const index = self.state.messages.findIndex(m => m._id === msg.chat_id);
      messages[index].messages.push(msg);

      self.setState({
        // focus: {
        //   ...self.state.focus,
        //   messages: [
        //     ...self.state.focus.messages,
        //     msg
        //   ]
        // },
        messages: messages
      },
      () => { 

        if ( willScroll === true ) {
          self.scrollToBottom();
        }

       }
      )

    });
  }

  componentWillUnmount() {
    // this.socket.disconnect()
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

  setFocusedChat(chat_id) {
    const self = this;

    this.setState({
      focusedChat: chat_id,
    }, () => {
      this.setState({sidebarVisible: false})
      setTimeout(function(){ self.scrollToBottom(); }, 100);
      this.socket.emit( 'join-room', self.state.focusedChat )
    });
  }

  messagesSort( a, b ) {
    console.log(b.messages[b.messages.length - 1].date);
    return ( moment(b.messages[b.messages.length - 1].date) - moment(a.messages[a.messages.length - 1].date) )
  }

  renderMessageContacts() {

    if (this.state.inboxFilter === 'people') {
      return (
        this.state.messagesLoading ?
        <div className="loading-conversations">
          <img src={loadingGif} alt="Loading Icon"/>
          <div className="alert alert-articles mt-3">
            <span className="alert-heading">Loading Chat</span>
          </div>
        </div>
        :
        this.state.messages.length > 0 ?
        this.state.messages.sort( this.messagesSort ).map(message => 
          <div onClick={() => this.setFocusedChat(message._id)} className={"chat-contact inbox-message " + (message.promotional ? 'ad ' : '') + (message._id === this.state.focusedChat ? 'active ' : '')} >

            <div className="contact-photo">
              <div className="status-container">
                <div className="status"></div>
              </div>

              <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${ message.fetchedUsers?.filter(user => user.id !== this.props.user_id).map(user => user.id) }.jpg`} alt=""/>
            </div>

            <div className="contact-body message-content">

              <div className="message-sender">

                <div>

                  <div className="contact-name d-flex justify-content-between w-100"> 
                    <span>{message.fetchedUsers?.filter(user => user.id !== this.props.user_id).map(user => user.name)}</span>
                    <span style={{fontSize: '0.7rem', fontFamily: 'montserrat, sans-serif', fontWeight: '400'}} className="mute">{ moment( message.messages[message.messages.length - 1].date ).format("MMM Do | h:mm a") }</span>
                  </div>

                    <small>

                        {message.encryption === true ?
                        <span><i className="fas fa-lock"></i>Encrypted</span>
                        :
                        (this.state.showMessagePreview &&
                            <span>
                                {message.messages[message.messages.length - 1].message !== '' ? 

                                    <span>
                                    {message.messages[message.messages.length - 1].message.substring(0,35)}
                                    {message.messages[message.messages.length - 1].message.length > 35 ? 
                                    <><span>...</span></>
                                    : 
                                    ''}
                                    </span>
                                    : 
                                    <span><i className="far fa-file-image mr-2"></i>Image</span>

                                }
                            </span>
                        )    
                        }

                    </small>
                </div> 
 
              </div>

            </div>
          </div>
        )
        :
        <div>

          <div className="loading-conversations">
            <div className="alert alert-articles mt-3">

              <div className="alert-heading">No Messages</div>
              <small>Start one by clicking below</small>

            </div>
          </div>

        </div>
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

  sendSocketImage() {
    const self = this;
    // console.log("Socket")
    this.socket.emit('5f208af919d23fbf84c7a6aa', {
      type: 'image',
      url: 'https://articles-website.s3.amazonaws.com/chat/5f208af919d23fbf84c7a6aa/b2cca4cd-37ff-490e-a804-a309f49e2e9d'
    });
  }

  sendSocketText() {
    const self = this;
    // console.log("Socket")
    this.socket.emit('5f208af919d23fbf84c7a6aa', {
      type: 'text',
      text: 'Hello there!'
    });
  }

  logRooms() {
    this.socket.emit('log-rooms');
  }

  sendMessage() {
    const self = this;
    const data = new FormData();

    let focused = this.state.messages?.find(m => m._id === this.state.focusedChat);

    data.append('file', this.state.imageFile);
    data.append('chat_id', self.state.focusedChat);
    data.append('message', self.state.chatMessage);

    // {
    //   chat_id: self.state.focus._id,
    //   message: self.state.chatMessage,
    //   imageFile: data
    // }

    if ( focused?._id === undefined ) {
      console.log("This should not happen");
    } else {

      axios.post('/api/chatMessage', data)
      .then(function (response) {
        console.log(response.data);

        // socket.to(self.state.focus._id).emit(self.state.chatMessage);

        this.socket.emit(focused?._id, self.state.chatMessage);

        let willScroll = false;

        if ( self.state.scrollPosition === 1 ) {
          willScroll = true
        }

        if (response.data.type === 'photo') {

          self.setState({
            // focus: {
            //   ...self.state.focus,
            //   messages: [
            //     ...self.state.focus.messages,
            //     {
            //      date: moment()._d,
            //      message: '',
            //      sender: self.props.user_id,
            //      media: 'photo',
            //      url: response.data.url
            //     }
            //   ]
            // },
            chatMessage: '',
            image: '',
            imageFile: ''
          }, () => {
            if ( willScroll === true ) {
              // self.scrollToBottom();
            }
          })

        } else {

          self.setState({
            // Leave this out for now and have websockets do all the view working
            // focus: {
            //   ...self.state.focus,
            //   messages: [
            //     ...self.state.focus.messages,
            //     {
            //      date: moment()._d,
            //      message: self.state.chatMessage,
            //      sender: self.props.user_id
            //     }
            //   ]
            // },
            chatMessage: '',
            image: '',
            imageFile: ''
          }, () => {
            if ( willScroll === true ) {
              // self.scrollToBottom();
            }
          })

        }

      })
      .catch(function (error) {
        console.log(error);
      });

    }

  }

  startChat(user, message) {
    const self = this;

    axios.post('/api/startChat', {
      user, message
    })
    .then(function (response) {
      console.log(response.data);

      self.setState({
        messages: [
          ...self.state.messages,
          {
            _id: response.data.insertedId,
            users: [
              user, self.props.user_id
            ],
            fetchecUsers: [
              {
                id: self.props.user_id
              },
              {
                id: user
              }
            ],
            messages: [
              {
                _id: 'will-fill',
                date: moment()._d,
                message: message,
                sender: self.props.user_id
              }
            ]
          }
        ]
      })

      // TODO - Not how I want this but has to be for now, fix the setState call, reload messages or anything else!
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error.response);

      self.setState({
        startChatError: error.response.data
      })
    });

  }

  deleteMessage(chat_id, message_id) {
    const self = this;

    // let focused = this.state.messages?.find(m => m._id === this.state.focusedChat);
    const index = self.state.messages.findIndex(m => m._id === chat_id);

    console.log(`Chat Id: ${chat_id}, Message Id: ${message_id}`);

    axios.post('/api/deleteChatMessage', {
      chat_id, message_id
    })
    .then(function (response) {
      console.log(response.data);

      console.log( index );

      let tempMessages = [...self.state.messages];
      tempMessages[index].messages = self.state.messages[index].messages.filter((message) => {return message._id !== message_id});
      // let tempMessageThread = self.state.messages[index].messages.filter((message) => {return message._id !== message_id});

      // console.log(self.state.messages)
      // console.log(tempMessages)

      self.setState({
        messages: tempMessages
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteConversation = (chat_id) => {
    const self = this;

    console.log(`Chat Id: ${chat_id}`);

    axios.post('/api/deleteChatConversation', {
      chat_id
    })
    .then(function (response) {
      console.log(response.data);

      self.setState({
        // focus: {},
        focusedChat: '',
        messages: self.state.messages.filter((message) => {return message._id !== chat_id})
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  fakeDeleteConversation = (chat_id) => {
    const self = this;

    console.log(`Chat Id: ${chat_id}`);

    self.setState({
      // focus: {},
      focusedChat: '',
      messages: self.state.messages.filter((message) => {return message._id !== chat_id})
    })
  } 

  render() {
    const { focus } = this.state;

    let focused = this.state.messages?.find(m => m._id === this.state.focusedChat);

    // const index = this.state.messages.findIndex(m => m._id === this.state.focusedChat);

    // const focusedChat = this.state.messages[index]

    // console.log(this.state.focusedChat)
    // console.log(index)

    // console.log("About to log focusedChat")
    // console.log(focusedChat)

    return (
      <div className="messages-page">

        {this.state.lightboxOpen && (
          <Lightbox
            mainSrc={this.state.lightboxFocus}
            // nextSrc={images[(photoIndex + 1) % images.length]}
            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ lightboxOpen: false })}

            // onMovePrevRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + images.length - 1) % images.length,
            //   })
            // }

            // onMoveNextRequest={() =>
            //   this.setState({
            //     photoIndex: (photoIndex + 1) % images.length,
            //   })
            // }

          />
        )}

        <div className={"start-chat-container " + (this.state.createChatOverlay ? 'visible' : '')}>

          <div onClick={() => this.setState({createChatOverlay: false})} className="start-chat-background"></div>

          <div className="start-chat card">

            <div className="card-header">
              Start Chat
            </div>

            <div className="card-body">

              <div className="form-group articles">
                <label for="new-chat-user-id">User's ID or Email Address</label>
                <input 
                  className="form-control with-label" 
                  name="startChatUser" 
                  id="startChatUser" 
                  value={this.state.startChatUser}
                  onChange={(e) => this.handleChange(e)}
                  type="text"/>
              </div>

              <div className="form-group articles">
                <label for="startChatMessage">Message</label>
                <TextareaAutosize
                  className="form-control with-label"
                  name="startChatMessage"
                  value={this.state.startChatMessage}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Type your message">
                </TextareaAutosize>
              </div>

              {this.state.startChatError !== '' &&
                <div className="alert alert-danger">
                  {this.state.startChatError}
                </div>
              }

              <button onClick={() => this.startChat(this.state.startChatUser, this.state.startChatMessage)} disabled={this.state.startChatUser === '' || this.state.startChatMessage === ''} className="btn btn-lg w-100 btn-articles-light">Start Chat</button>

            </div>

            <div className="card-footer">
              <small>Your User ID is <b>{this.props.user_id}</b> provide this to a friend to start a conversation.</small>
            </div>

          </div>

        </div>
        
        <div className={"nav-bar-sticker d-none " + (this.props.sideMenuOpen ? '' : '')}>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>

        {/* <div className="container-fluid"> */}

          <div className="chat-card card my-0 mx-0 border-0">

            <div className="card-body d-flex p-0">

              <div className={"chat-sidebar card rounded-0 " + (this.state.sidebarVisible ? 'expand' : '')}>

                {/* <div className="alert alert-warning mb-0 p-1" style={{fontSize: '0.8rem'}}>Chat is in development! Articles staff will <span className="badge badge-danger">NEVER</span> ask you for your email or personal info via messages!</div>\ */}

                {/* <div className="d-flex justify-content-center align-self-center"> */}

                <button onClick={() => this.setFocusedChat('')} className="home-button btn btn-articles-light d-flex m-2 mb-0">
                    <i className="fas fa-home"></i>
                    <div>Messages Home</div>
                </button>

                {/* </div> */}

                {this.renderMessageContacts()}

                <div className="start-chat">
                  <button onClick={() => this.setState({createChatOverlay: true})} className="btn btn-articles-light">Start Chat</button>
                </div>
              </div>

              <div className={"chat-content" + (this.state.sidebarVisible ? '' : ' expand') + (Object.keys( focused || {} ).length === 0 ? ' empty' : '')}>

                <div onClick={() => this.setState({sidebarVisible: false})}  className={"content-darken " + (this.state.sidebarVisible ? 'visible ' : '')}></div>

                <div className="content-header">
                  <div className="row justify-content-center justify-content-lg-between align-items-center">

                    <div className="col-8 col-sm-8 d-flex justify-content-center align-items-center">

                        <button id="conversations-menu-button" onClick={() => this.setState({sidebarVisible: true})} className="btn btn-articles-light d-lg-none mr-3">
                            <i className="fas fa-comment mr-2"></i>
                            <span>Messages</span>
                        </button>

                        {this.state.focusedChat !== '' &&
                        <div className="d-flex align-items-center">
                            <div className="badge badge-dark mr-2">Offline</div>
                            <div>{focused?.fetchedUsers?.filter(user => user.id !== this.props.user_id).map(user => user.name)}</div>
                        </div>
                        }

                    </div>

                    {this.state.focusedChat !== '' &&
                    <div className="col-auto">

                        <OverlayTrigger 
                            trigger='click' 
                            rootClose 
                            placement="bottom" 
                            overlay={ 
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
                                            <button className="btn btn-radio active btn-sm btn-articles-light">
                                                No
                                            </button>
                                            <button className="btn btn-radio btn-sm btn-articles-light">
                                                Yes
                                            </button>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="mr-3">Delete Chat</div>
                                            <div>
                                            <button onClick={() => this.deleteConversation(focused?._id)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                            </div>
                                        </div>

                                        <div className={"justify-content-between align-items-center mt-3 " + (this.props.user_id === '5e90cc96579a17440c5d7d52' ? 'd-flex' : 'd-none')}>
                                            <div className="mr-3">Fake Delete Chat</div>
                                            <div>
                                            <button onClick={() => this.fakeDeleteConversation(focused?._id)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                            </div>
                                        </div>

                                    </Popover.Content>
                                
                                </Popover>
                            }
                        >
                            <button className="btn btn-articles-light">
                                <i className="fas fa-cog mr-0"></i>  
                            </button>
                        </OverlayTrigger>

                    </div>
                    }

                  </div>
                </div>

                <div className="content-home">

                    <div className="container">
                        
                        <h2 onClick={() => this.setState({sidebarVisible: true}) }>Messages Home</h2>
                        <div className="mb-5" style={{fontSize: '1rem'}}>Articles staff will <span style={{fontSize: '1.0em'}} className="badge badge-danger">NEVER</span> ask you for personal info such as your email, address, password, etc via messages!</div>

                        <div className="message-settings-cards">

                            {/* Message Previews */}
                            <div className="card p-3 d-flex">

                                <div className="d-flex justify-content-between mb-2">
                                    <div>Message Preview</div>

                                    <label 
                                        className="articles-switch mb-0" 
                                        onClick={ () => this.setState(prevState => ({showMessagePreview: !prevState.showMessagePreview})) }
                                    >
                                        <input type="checkbox" checked={this.state.showMessagePreview}/>
                                        <span className="slider" onClick={ () => this.setState(prevState => ({showMessagePreview: !prevState.showMessagePreview})) }></span>
                                    </label>
                                </div>

                                <hr/>

                                <div className="mt-2 d-flex">
                                    <div className="fake-profile-photo mr-2"></div>
                                    <div>
                                        <div><b>Sender</b></div>
                                        {this.state.showMessagePreview && <div className="message-preview">A short preview of the message</div> }
                                    </div>
                                </div>

                            </div>

                            {/* Online Status */}
                            <div className="card p-3 d-flex">

                                <div className="d-flex justify-content-between mb-2">
                                    <div>Online Activity</div>

                                    <label className="articles-switch mb-0" onClick={ () => this.setState(prevState => ({showOnlineActivity: !prevState.showOnlineActivity})) }>
                                        <input type="checkbox" checked={this.state.showOnlineActivity}/>
                                        <span className="slider" onClick={ () => this.setState(prevState => ({showOnlineActivity: !prevState.showOnlineActivity})) }></span>
                                    </label>
                                </div>

                                <hr/>

                                <div className="mt-2">
                                    {this.state.showOnlineActivity ? <div className="badge badge-success mr-2">Online</div> : <div className="badge badge-dark mr-2">Offline</div>}  
                                    <div>Displays whether you are online or not</div>
                                </div>

                            </div>
                        
                        </div>
                    </div>

                    </div>

                <div ref={this.myScrollRef} onScroll={(e) => this.listenToScroll(e)} className="content-body">
                  
                  {focused?.encryption === true ? 

                  <div className="chat-encryption-warning card">

                    <div className="card-header">
                      Chat Encrypted
                    </div>

                    <div className="card-body">
                      <div>The user who started this chat set a password that you will need to decrypt the messages. For best security obtain this password from the user in person.</div>
  
                      <div style={{width: '100%'}} className="form-group d-inline-block articles mt-3">
                        <label for="password">Password</label>
                        <input className="form-control with-label" name="password" id="password" type="text" value=""/>
                      </div>
  
                      <button className="btn btn-articles-light w-100">Enter</button>
                    </div>

                  </div>

                  :

                  focused?.messages?.map((message) => (

                      <div className={"chat-message p-3 " + ( message.sender === this.props.user_id ? 'personal' : '' )}>

                        <div className={"message-photo " + ( message.sender === this.props.user_id ? 'd-none' : '' )}>
                          <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
                        </div>

                        <div className="message-details">

                          <div className={"message " + (message.media === 'photo' ? 'photo' : '')}>
                            {
                            message.media !== 'photo' ? 
                            <span>{message.message}</span>
                            :
                            <img style={{cursor: 'pointer'}} onClick={() => this.setState({lightboxFocus: message.url, lightboxOpen: true})} className="img-fluid" src={message.url} alt=""/>
                            }

                            <div className="message-extras">
                              <i onClick={() => this.deleteMessage(focused?._id, message._id)} className="fas fa-trash-alt mr-0"></i>
                            </div>

                          </div>

                          <div className="date">{moment(message.date).format("LLL")}</div>
                        </div>

                      </div>

                  ))}

                </div>

                <div className={"content-send " + (focused?.encryption ? 'd-none' : '')}>

                  <div onClick={() => this.scrollToBottom()} className={"scroll-lock " + (this.state.scrollPosition === 1 ? 'active' : '')}>
                    <span>Auto Scroll</span>
                    <span className={(this.props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>&nbsp;{this.state.scrollPosition}</span>
                  </div> 

                  <div className={"thumbnail-container " + (this.state.image === '' ? 'd-none' : '')}>

                    <button onClick={() => this.setState({image: '', imageFile: ''})} className="btn btn-sm btn-danger remove">
                      <span><i className="far fa-window-close"></i>Remove</span>
                    </button>

                    <img id="thumbnail" src={this.state.image}/>

                  </div>

                  {this.state.image === '' ? 
                  <TextareaAutosize
                    className="chat-message mr-1" 
                    name="chatMessage"
                    value={this.state.chatMessage}
                    onKeyPress={(e) => { this.handleTextareaChange(e) }}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Type your message">
                  </TextareaAutosize>
                  : 
                  ''}                  

                  <div className="align-items-start">
                    <input className="d-none" onFocus={() => (this.props.changeFocus('photo'))} id="file-upload" onChange={this.onImageUpload} accept="image/x-png,image/gif,image/jpeg" type="file" name="myfile" />
                    <label for="file-upload" className="btn btn-sm btn-articles-light mb-0"><i className="fas fa-paperclip mr-0 mr-m-1"></i><span className="d-none d-md-inline">Attach</span></label>
  
                    <button disabled={this.state.chatMessage === '' && this.state.image === ''} className="btn btn-sm btn-articles-light" onClick={() => this.sendMessage()}><i className="far fa-paper-plane mr-0 mr-m-1"></i><span className="d-none d-md-inline">Send</span></button>
                    
                    <button onClick={() => this.sendSocketText()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (this.props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Txt</button>
                    <button onClick={() => this.sendSocketImage()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (this.props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Img</button>
                    <button onClick={() => this.logRooms()} className={"btn btn-sm btn-articles-light d-none d-md-inline " + (this.props.user_id === '5e90cc96579a17440c5d7d52' ? '' : 'd-none')}>Room</button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        {/* </div> */}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.id,
    user_details: state.auth.user_details,
    auth: state.auth.isAuthenticated,
    sideMenuOpen: state.site.sideMenuOpen
  };
};

const WithSocket = props => (
  <SocketContext.Consumer>
      { socket => <Messages {...props} socket={socket}/> }
  </SocketContext.Consumer>
)

export default connect(
  mapStateToProps
)(WithSocket);