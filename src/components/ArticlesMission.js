import React from 'react';

const ArticlesMission = () => (
  <div className='container'>
    <h1>Mission Statement</h1>
    <p>This will serve as an overview of our goals, visions and overall mission with what we are doing.</p>

    <nav id="navbar-example2" className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link" href="#fat">@fat</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#mdo">@mdo</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#one">one</a>
            <a className="dropdown-item" href="#two">two</a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item" href="#three">three</a>
          </div>
        </li>
      </ul>
    </nav>
    <div data-spy="scroll" data-target="#navbar-example2" data-offset="0" style={{height: '100px', overflowY: 'scroll', position: 'relative'}}>
      <h4 id="fat">@fat</h4>
      <p>...</p>
      <h4 id="mdo">@mdo</h4>
      <p>...</p>
      <h4 id="one">one</h4>
      <p>...</p>
      <h4 id="two">two</h4>
      <p>...</p>
      <h4 id="three">three</h4>
      <p>...</p>
    </div>

  </div>
);

export default ArticlesMission;