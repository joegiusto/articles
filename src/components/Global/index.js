import React, {Component} from 'react'
// Recieves function as props.afterConfirm that will get called when delete has been confirmed

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

  cancelConfirm() {
    this.setState({confirm: false})
  }

  render() {
    return (
      this.state.confirm ? 
      <div className="d-flex">
        <div style={{cursor: 'pointer'}} onClick={() => this.cancelConfirm()} className="badge badge-warning noselect">Cancel</div>
        <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Confirm</div>
      </div>
      :
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Delete</div>
    )
  }
}

export { ConfirmDelete }