import React from 'react';

class StepFive extends React.Component {
  render(props) {
      return (
        <div>

          <div>
            <h5>Privacy Policy</h5>

            <div className="read">Read</div>

            <label for="privacy">I accept</label>
            <input type="checkbox" id="privacy" name="privacy"/>
          </div>

          <div>
            <h5>Cookie Usage</h5>

            <div className="read">Read</div>

            <label for="cookie">I accept</label>
            <input type="checkbox" id="cookie" name="cookie"/>
          </div>

          <div>
            <h5>Terms Of Use</h5>

            <div className="read">Read</div>
            
            <label for="cookie">I accept</label>
            <input type="checkbox" id="cookie" name="cookie"/>
          </div>

        </div>
      )
  }
}

export default StepFive;