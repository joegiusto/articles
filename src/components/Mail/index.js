import React, { Component } from 'react';

// const Page = () => (
//   <div style={{height: '100vh', marginTop: '-50px'}} className="container">
//     <div class="row h-100 justify-content-center">
//     <div class="col-sm-6 my-auto">
//       <div class="card card-block p-5">
//         <h1>Mesh</h1>
//         <p>Fill out a description.</p>
//       </div>
//     </div>
//   </div>
//   </div>
// );

class EmailHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: []
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  componentDidMount() {

    var senderWords = ['Jack', 'Poper', 'King', 'Max', 'Joey', 'Willington', 'Smith', 'Cole', 'Dr.', 'Heavy-Bottoms'];
    var subjectWords = ['Rock', 'Paper', 'Scissors', 'Deal', 'Weekend Only', 'Going Fast', 'Limited Offer'];
    var contentWords = ['Blah', 'Buisness', 'Stoinks', 'Fast', 'ASAP', 'Coffee'];

    function renderWords(amount, set) {

      var wordList = '';

      for (let i=0; i < amount; i++) {
        wordList += (i > 0 ? ' ' : '') + set[ Math.floor(Math.random() * set.length) ]
      }

      return (wordList);
      

    }

    var buildMessageList = []; 
    for (let i=0; i < this.randomIntFromInterval(15, 30); i++) {
      buildMessageList.push({
        sender: renderWords( this.randomIntFromInterval(2, 3), senderWords ),
        subject: renderWords( this.randomIntFromInterval(4, 5), subjectWords ),
        content: renderWords( this.randomIntFromInterval(23, 70), contentWords )
      })
    }

    this.setState({
      messageList: buildMessageList
    })
  }

  render() {
    return (
      <div className="email-page background">
        <div className="nav-bar-sticker">
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>
        <div className="page-note">MyMail - EARLY ALPHA</div>

        <div className="dashboard">
          <div className="messages">
            <div className="current-spotlight px-4 py-2">Inbox - {this.state.messageList.length}</div>
            {this.state.messageList.map(message => 
              (
                <div className="message">
                  <div className="message-photo"></div>
                  <div className="message-content">
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-subject">{message.subject}</div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="content">
            <div className="header px-4 py-2">
              <div className="subject">Burger King Weekly Flyer</div>
            </div>
          </div>
          <div className="ad"></div>
        </div>

      </div>
    )
  }
}

export default EmailHome 