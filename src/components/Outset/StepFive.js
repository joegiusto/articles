import React from 'react';

class StepFive extends React.Component {
  render(props) {
      return (
          <>
            <div className="dual-header">
              <h2>Privacy Info</h2>
              <h5>Step 5/{this.props.totalSteps}</h5>
            </div>
            <hr/>
            {/* The button will execute the handler function set by the parent component */}
            <input 
              name="size"
              type="text" 
              value={this.props.size}
              onChange={this.props.action}
              className="form-control" 
              aria-describedby="emailHelp" 
              // placeholder="String"
              autocorrect="off"
              spellcheck="false"
            />
            <button className="d-block" onClick={() => (this.props.log("Whatever I want"))}>Privacy Policy</button>
            <button className="d-block" onClick={() => (this.props.log("Whatever I want"))}>Cookie Usage</button>
            <button className="d-block" onClick={() => (this.props.log("Whatever I want"))}>Call Log</button>

          </>
      )
  }
}

export default StepFive;