import React from 'react';

const StepFour = (props) => (
  <div>
    <div className="dual-header">
      <h2>Party Info</h2>
      <h5>Step 4/{props.totalSteps}</h5>
    </div>
    <hr/>

    <p>At Articles we promote independent thoughts and stray away from coportate media control and political biases. While Articles is not a political party we are a movement trying to get people away from in the box thinking. If you do identify with a party thought and wouldn't mind sharing we can use that information.</p>
    
    <div className="party-group mb-3 dual-header">

      <span>
        <button onClick={() => (props.changeParty('Democrat'))} className="btn btn-primary ml-1">Democrat</button>
        <button onClick={() => (props.changeParty('Democrat'))} className="btn btn-primary ml-1">Green</button>
        <button onClick={() => (props.changeParty('Articles'))} className="btn btn-dark">Articles</button>
        <button onClick={() => (props.changeParty('Democrat'))} className="btn btn-primary ml-1">Libertarian</button>
        <button onClick={() => (props.changeParty('Rebublican'))} className="btn btn-danger ml-1">Rebublican</button>
      </span>

      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Others
        </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a className="dropdown-item" href="#">Dropdown link</a>
          <a className="dropdown-item" href="#">Dropdown link</a>
        </div>
      </div>

    </div>

  </div>
)

export default StepFour;