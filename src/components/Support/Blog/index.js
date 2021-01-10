import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class Blog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'General'
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="blog-page">

        <div className="header">
          <img className="d-block" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
          <h1 className="heading-font">Articles Updates</h1>
        </div>

        <div className="blog-nav">
          {/* <div onClick={() => this.setState({tab: 'Posts'})} className={"link " + (this.state.tab === 'Posts' ? 'active' : '')}>All</div> */}
          <div onClick={() => this.setState({tab: 'General'})} className={"link " + (this.state.tab === 'General' ? 'active' : '')}>General</div>
          <div onClick={() => this.setState({tab: 'Development'})} className={"link " + (this.state.tab === 'Development' ? 'active' : '')}>Development</div>
        </div>

        <div className="main">
          <i className="far fa-frown mr-0"></i>
          <div>No content yet to display</div>
        </div>

      </section>
    )
  }
}

export default Blog