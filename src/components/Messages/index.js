import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';

class EmailHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesLoading: false,
      messages: [],

      focus: {}
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  componentDidMount() {
    const self = this;

    self.setState({
      messagesLoading: true
    })

    axios.post('/api/getUserMessages', {
      _id: self.props._id
    })
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({

        // Set Ads
        messages: response.data,

      }, () => {
        const messagesCopy = self.state.messages

        messagesCopy.splice(1, 0, {
          promotional: true,
          sender: 'Burger King',
          subject: <span className="badge badge-danger">Ad</span>,
          message: '<img src="https://1.bp.blogspot.com/-Vx5R6qB1Aus/XQJGW8egVlI/AAAAAAABF_k/aVq1NlnzvOkJZ18VYFZYRP3COXVkdJavACLcBGAs/s1600/burger-king-whopper-meal-deals.jpg"></img>'
        })
        
        self.setState({
          messages: messagesCopy,
          messagesLoading: false
        })
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setFocus(message) {
    this.setState({focus: message})
  }

  render() {
    return (
      <div className="email-page background">
        
        <div className="nav-bar-sticker">
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>

        <div className="page-note">Mesh - BETA</div>

        <div className="dashboard">
          <div className="messages">

            <div className="current-spotlight px-4 py-2">Real Inbox - {this.state.messages.length}</div>
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
                  <div onClick={() => this.setFocus(message)} className={"message " + (message.promotional ? 'ad' : '')} >
                    <div className="message-photo">
                      <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${message.sender}.jpg`} alt=""/>
                    </div>
                    <div className="message-content">
                      <div className="message-sender">{message.fetchedSender || message.sender}</div>
                      <div className="message-subject">{message.subject}</div>
                    </div>
                  </div>
                )
              )
            }
            
          </div>

          <div className="content">

            <div className="header px-4 py-2">
              <div className="subject">{this.state.focus.subject}</div>
              
              {this.state.focus.sender === undefined ?
                null
                :
                <i class="far fa-trash-alt fa-2x mr-0"></i>
              }
            </div>

            <div className="content p-3">

              {this.state.focus.sender === undefined ?
              <div>Hello</div>
              :
              <div dangerouslySetInnerHTML={{__html: this.state.focus.message}}></div>
              }

              <div className="sender">
                {this.state.focus.sender}
              </div>

              {this.state.focus.sender === undefined || this.state.focus.promotional === true ?
                null
                :
                <div className="response mt-5">
                  Reply:
                  <input type="text"/>
                </div>
              }

            </div>            

          </div>

          <div className="ad"></div>
        </div>

      </div>
    )
  }
}

// export default EmailHome 

const mapStateToProps = (state) => {
  return {
    _id: state.auth.user.id,
  };
};

export default connect(
  mapStateToProps
)(EmailHome );