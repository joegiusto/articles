import React from 'react';

class StepFive extends React.Component {
  render() {
      return (
        <div>

          <div>
            <h5>Privacy Policy</h5>

            <div className="read">Read</div>

            <label for="privacy">I accept</label>
            <input type="checkbox" id="privacy" name="privacyAccept" checked={this.props.privacyChecked} onChange={this.props.handleChange}/>
          </div>

          <div>
            <h5>Cookie Usage</h5>

            <div className="read">Read</div>

            <label for="cookie">I accept</label>
            <input type="checkbox" id="cookie" name="cookieAccept" checked={this.props.cookieChecked} onChange={this.props.handleChange}/>
          </div>

          <div>
            <h5>Terms Of Use</h5>

            <div className="read">Read</div>
            
            <label for="cookie">I accept</label>
            <input type="checkbox" id="cookie" name="termsAccept" checked={this.props.termsChecked} onChange={this.props.handleChange}/>
          </div>

        </div>
      )
  }
}

export default StepFive;