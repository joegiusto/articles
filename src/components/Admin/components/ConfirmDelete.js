import React, { Component } from 'react'

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      confirm: false
    };

  }

  handleClick() {

    if (this.state.confirm) {
      this.props.afterConfirm()
    } else {
      this.setState({confirm: true})
    }

  }

  render() {
    return (
      this.state.confirm ? 
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className={"badge badge-danger noselect " + (this.props.className)}>Confirm</div>
      :
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className={"badge badge-danger noselect " + (this.props.className)}>Delete</div>
    )
  }
}

export default ConfirmDelete;