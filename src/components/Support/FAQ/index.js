import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class FAQ extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          question: 'What is Articles?',
          answer: 'Questions like this are better answered in our mission statement which can be read here.',
          focus: 'General'
        },
        {
          question: 'How do we plan to use the platform to fix issues in America?',
          answer: '',
          focus: 'General'
        },
        {
          question: 'Which political party does Articles align with?',
          answer: '',
          focus: 'General'
        },
        {
          question: 'Where is your clothing sourced from?',
          answer: '',
          focus: 'Clothing'
        },
        {
          question: 'Do you ship worldwide?',
          answer: 'Yes, but we do charge extra for shipments outside the United States',
          focus: 'Clothing'
        },
        {
          question: 'Does Articles have a code of ethics for your journalists to follow?',
          answer: '',
          focus: 'News'
        },
        {
          question: 'Which political party does Articles align with?',
          answer: '',
          focus: 'Party'
        },
      ]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="faq-page">
        <div className="container">

          <h1 className="mb-0">Frequently Asked Questions</h1>
          <p className="lead mb-3">Our most asked questions answered</p>

          <div className="filter-section">
            <h5 className="label">Focus:</h5>

            <div>
              <button className="btn btn-articles-light btn-sm ">General</button>
              <button className="btn btn-articles-light btn-sm ">Clothing</button>
              <button className="btn btn-articles-light btn-sm ">News</button>
              <button className="btn btn-articles-light btn-sm ">Party</button>
            </div>
          </div>

          <hr className="my-3"/>

          <div className="row align-items-start">

            <div className="col-lg-9">
              <Accordion defaultActiveKey={1}>
    
                {this.state.items.map( (item, i) => (
                  <Card>
                    <Accordion.Toggle className="d-flex justify-content-between" as={Card.Header} variant="link" eventKey={i + 1}>
                      <h5 className="mb-0">{item.question}</h5>
                      <div className="badge badge-sm badge-articles-light">{item.focus}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        {item.answer}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
    
              </Accordion>
            </div>

            <div className="col-lg-3">
              <button className="btn btn-articles-light w-100">Have a question?</button>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default FAQ