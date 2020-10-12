import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class Blog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'Posts'
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="blog-page">

        <div className="header">
          <img className="d-block" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
          <div className="heading-font">The Articles Blog</div>
        </div>

        <div className="blog-nav">
          <div onClick={() => this.setState({tab: 'Posts'})} className={"link " + (this.state.tab === 'Posts' ? 'active' : '')}>Posts</div>
          <div onClick={() => this.setState({tab: 'Archive'})} className={"link " + (this.state.tab === 'Archive' ? 'active' : '')}>Archive</div>
          <div onClick={() => this.setState({tab: 'Videos'})} className={"link " + (this.state.tab === 'Videos' ? 'active' : '')}>Videos</div>
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