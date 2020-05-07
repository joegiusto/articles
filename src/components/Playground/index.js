import React from 'react';

class Outset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div className="container mt-5">

        <h1>Untill Next Time</h1>
        <h2>Untill Next Time</h2>
        <h3>Untill Next Time</h3>
        <h4>Untill Next Time</h4>
        <h5>Untill Next Time</h5>

        <ul>
          <li>
            <a href="https://google.com">Testing route 1</a>
          </li>
          <li>
            <a href="https://google.com">Testing route 2</a>
          </li>
          <li>
            <a href="https://google.com">Testing route 3</a>
          </li>
        </ul>

      </div>
    )
  }
}

export default Outset