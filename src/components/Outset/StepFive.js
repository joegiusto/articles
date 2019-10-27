import React from 'react';

class StepFive extends React.Component {
  render() {
      return (
        <div className="accept-tile-container">

          <div className="accept-tile">
            <h5>Privacy Policy</h5>

            <div className="dual-header">
              <div className="read">TLDR</div>
              <div className="read">Read</div>
            </div>

            <label for="privacy">I accept</label>
            <input type="checkbox" id="privacy" name="privacyAccept" checked={this.props.privacyChecked} onChange={this.props.handleChange}/>
          </div>

          <div className="accept-tile">
            <h5>Cookie Usage</h5>

            <div className="read">Read</div>

            <label for="cookie">I accept</label>
            <input type="checkbox" id="cookie" name="cookieAccept" checked={this.props.cookieChecked} onChange={this.props.handleChange}/>
          </div>

          <div className="accept-tile">
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