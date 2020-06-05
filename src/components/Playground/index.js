import React from 'react';

class Outset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div className="playground-page">
        <div className="container mt-5">
  
          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <h4>Heading Four</h4>
          <h5>Heading Five</h5>

          <p>This is an example of a text block on the page.</p>

          <button className="btn btn-articles-light mr-2">Articles Light</button>
          <button className="btn btn-articles-light alt">Articles Light Alt</button>
  
          {/* <ul>
            <li>
              <a href="https://google.com">Testing route 1</a>
            </li>
            <li>
              <a href="https://google.com">Testing route 2</a>
            </li>
            <li>
              <a href="https://google.com">Testing route 3</a>
            </li>
          </ul> */}
  
        </div>
      </div>
    )
  }
}

export default Outset