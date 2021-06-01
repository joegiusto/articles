import React, {Component} from 'react'

import { connect } from 'react-redux';
import { pushNotification } from '../../../actions/notificationArea'

class NotificationArea extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      clearAfter: this.props.notificationArea.notification.clearAfter,
      time: 0,
      message: this.props.notificationArea.notification.text,
      visible: this.props.notificationArea.notification.visible
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevProps.notificationArea.notification.visible !== this.props.notificationArea.notification.visible) {

      console.log("New Notification has been pushed to the user");

      // this.loadNotification()
    }
  }

  componentDidMount() {
    // this.loadNotification();
  }

  loadNotification() {
    const self = this;

    this.setState({
      time: this.props.notificationArea.notification.clearAfter,
      visible: true
    })

    var timer = setInterval(function() { 
      if ( self.state.time !== 0 ) {
        self.setState({
          time: self.state.time - 1
        })
      } else {

        console.log("Equial to 0")

        self.props.pushNotification({
          visible: false,
          message: ''
        })

        window.clearInterval(timer);

      }
    }, 1000);

  }

  render() {

    return(
      <div className={"notification-area " + (this.props.notificationArea.notification.visible ? '' : 'd-none')}>
        <div className="timer">{this.state.time}</div>
        <div className={"notification " + this.props.notificationArea.notification.styleType}>{this.props.notificationArea?.notification?.text}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.auth.user_details?.user?.first_name)
  return {
    // site: state.site,
    notificationArea: state.notificationArea
  };
};

export default connect(
  mapStateToProps, 
  { pushNotification } 
)(NotificationArea);