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

      inboxFilter: 'people',
      focus: {},

      createChatOverlay: false,

      scrollPosition: 0,
      isTyping: false,
      chatMessage: '',
      colorOption: '',
    }

    this.myScrollRef = React.createRef()
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
    // window.removeEventListener('scroll', this.listenToScroll)
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

  renderInboxMessages() {

    if (this.state.inboxFilter === 'people') {
      return (
        this.state.messages.map(message => 
          (
            <div onClick={() => this.setFocus(message)} className={"inbox-message " + (message.promotional ? 'ad ' : '') + (message._id === this.state.focus._id ? 'active ' : '')} >
  
              <div className="message-photo">
                <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
              </div>
  
              <div className="message-content">
  
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
               date: moment()._d,
               message: self.state.chatMessage,
               sender: self.props.user_id
              }
            ]
          },
          chatMessage: ''
        }, () => {
          if ( willScroll === true ) {
            self.myScrollRef.current.scrollTop = self.myScrollRef.current.scrollHeight;
          }
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

        <div onClick={() => this.setState({createChatOverlay: false})} className={"create-chat-overlay " + (this.state.createChatOverlay ? 'active' : '')}>

          <div className="create-chat active">
            <h5>Start Chat</h5>
            
            <input className="" type="text"/>
            <button className="btn btn-articles-light">Start</button>

            <h5 className="mt-3">Quick Chatt</h5>
            <div className="quick-chat-cards">
              <div className="quick-chat-card">Joey Giusto (Founder)</div>
            </div>

          </div>
        </div>
        
        <div className={"nav-bar-sticker " + (this.props.sideMenuOpen ? 'show' : '')}>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>

        {/* <div onClick={() => this.setFocus({})} className="page-note">
          <div className="branding-badge">
            <span>Mesh</span>
            <span className="beta">BETA</span>
          </div>
        </div> */}

        <div className="dashboard">
          <div className={"inbox-messages " + (this.state.focus._id === undefined ? '' : 'active')}>

            <div className="current-spotlight px-4 py-2 d-flex justify-content-between align-items-center">

              <div>
                <button onClick={() => this.setState({inboxFilter: 'people'})} className={"badge ml-1 " + (this.state.inboxFilter === 'people' ? 'badge-dark' : 'badge-light border')}>
                  People
                </button>
                <button onClick={() => this.setState({inboxFilter: 'newsletters'})} className={"badge ml-1 " + (this.state.inboxFilter === 'newsletters' ? 'badge-dark' : 'badge-light border')}>
                  Newsletters
                </button>
                <button onClick={() => this.setState({inboxFilter: 'rooms'})} className={"badge ml-1 " + (this.state.inboxFilter === 'rooms' ? 'badge-dark' : 'badge-light border')}>
                  Rooms
                </button>
                {/* <p>Inbox - {this.state.messages.length}</p> */}
              </div>

              {this.state.inboxFilter === 'people' ? 
              <div onClick={() => this.setState({createChatOverlay: true})} className="create"><i className="far fa-plus-square"></i></div>
              : 
              null
              }

            </div>

            {this.state.messagesLoading ? 
            <div className="loading-block">
              <div>
                <i className="fas fa-spinner fa-spin"></i>
                Loading
              </div>
            </div>

            :

            this.renderInboxMessages()}
   
          </div>

          <div className={"content " + this.state.colorOption + (this.state.focus._id === undefined ? '' : ' active')}>

            <div className={"header px-2 py-2 " + (focus._id === undefined ? 'd-none' : '')}>

              {focus.group_message ? 
              <div className="subject">Group Chat: {focus._id}</div>
              :
              <div className="subject">Personal Chat: {focus._id}</div>
              }
              
              {focus.sender === undefined ?
                null
                :
                <i className="far fa-trash-alt fa-2x mr-0"></i>
              }
            </div>

            <div ref={this.myScrollRef} onScroll={(e) => this.listenToScroll(e)} className={"chat-messages p-3"}>

              {focus._id === undefined ?

              <div className="welcome-page">
                <div>Hello {this.props.user_details.first_name}</div>
                <div className="card">
                  <div>0 New Messages!</div>
                </div>
              </div>

              :

              focus.messages.map((message) => (
                message.sender === this.props.user_id ? 
                  <div className="chat-message mb-3 personal">
                    <div className="sender">You</div>
                    <div className="message">{message.message}</div>
                    <div className="date">{moment(message.date).format("LLL")}</div>
                  </div>
                  :
                  <div className="chat-message mb-3">
                    <div className="sender">{message.sender}</div>
                    <div className="message">{message.message}</div>
                    <div className="date">{moment(message.date).format("LLL")}</div>
                  </div>
              ))}

            </div>

            {Object.keys(focus).length === 0 || focus.promotional === true ?
                null
                :
                <div className="response">

                  {/* {this.state.scrollPosition === 1 ? 
                    <div className="scroll-lock">
                      Auto Scroll
                    </div>  
                    :
                    null
                  } */}

                  <div className={"scroll-lock " + (this.state.scrollPosition === 1 ? 'active' : '')}>
                    Auto Scroll
                  </div> 

                  <div className="label">Reply:</div>

                  <div className="input-wrap">
                    <textarea className="" id="chatMessage" name="chatMessage" value={this.state.chatMessage} onChange={(e) => this.handleChange(e)} type="text"/>
                    <div onClick={() => this.sendMessage()} className="icon-wrap"><i className="far fa-paper-plane mr-0"></i></div>
                  </div>

                  <div className="security-status w-100 d-flex justify-content-between align-items-center">

                    <div>
                      <i className="fas fa-lock-open"></i>
                      <span>This chat is not encrypted</span>
                    </div>

                    <span className="badge badge-light">Options</span>

                  </div>
                </div>
              }

              <div className="color-options">
                <span className="label">Chat Color</span>
                <div>
                  <ColorOption realThis={this} name=""/>
                  <ColorOption realThis={this} name="gradientBlue"/>
                  <ColorOption realThis={this} name="gradientGreen"/>
                  <ColorOption realThis={this} name="gradientRed"/>
                  <ColorOption realThis={this} name="gradientYellow"/>
                  <ColorOption realThis={this} name="gradientPurple"/>
                </div>
              </div>       

          </div>

          <div className="ad-panel"></div>
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