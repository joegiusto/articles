import React, {Component} from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

class FAQ extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subscriptions: []
    }
  }

  componentDidMount() {
    const self = this;

    axios.post('/api/listSubscriptions', {
       
    })
    .then(function (response) {

      // socket.emit('deleteUser', id);

      self.setState({
        subscriptions: response.data.data
      });

      console.log(response)

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  createSubscription() {
    axios.post('/api/createSubscription', {
       
    })
    .then(function (response) {

      // socket.emit('deleteUser', id);

      // self.setState({
      //   users: self.state.users.filter(function( obj ) {
      //     return obj._id !== id;
      //   })
      // });

      console.log(response)

    })
    .catch(function (e) {
      console.log('error')
      console.log("Error", e.response.data);
    });
  }

  render() {
    return (
      <div className="subscribe-page">
        <div className="container">

          <div className="intro-section">
            <h1>Subscribe</h1>
            <div className="tiles">
  
              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-ad"></i>
                  Ad Free
                </div>
              </div>            
  
              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-percent"></i>
                  Discounts
                </div>
              </div>
  
              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-user-lock"></i>
                  Private Fourm
                </div>
              </div>
  
              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-laptop"></i>
                  Video Chats
                </div>
              </div>

              <div className="shadow">
                <div className="tile">
                <i className="fas fa-poll-h"></i>
                  Site Decisions
                </div>
              </div>

              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-flag-usa"></i>
                  Better America
                </div>
              </div>

              <div className="shadow">
                <div className="tile">
                  <i className="fas fa-video"></i>
                  Exclusive Videos
                </div>
              </div>

              <div className="shadow">
                <div className="tile">
                  <i className="far fa-comments"></i>
                  Meet Ups
                </div>
              </div>
  
            </div>
          </div>

          <div className="plans-section">
            <h1>Plans</h1>
            <div className="plans">

              <div className="plan">
                <h3>Supporter</h3>
                <div className="price">$1 a month</div>
                <ul>
                  <li>Ad Free</li>
                  <li>5% Discount</li>
                </ul>
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            
                {/* INFO - SUPPORTER PLAN */}
                {this.state.subscriptions.length > 0 ? 
                  // User has a current subscription
                  (this.state.subscriptions[0].plan.product === 'prod_I2y7aiDpmeSkFP' ?
                    // Is this product
                    <button disabled={true} className="commit-button btn btn-articles-light ">Active</button>
                    :
                    // Is another product
                    <button disabled={false} className="commit-button btn btn-articles-light alt">Switch</button>
                  )
                :
                  // User has no subscription
                  <div onClick={() => this.createSubscription('prod_I2y7aiDpmeSkFP')} className="commit-button btn btn-articles-light alt">Commit</div>
                }

              </div>

              <div className="plan">
                <h3>Patriot</h3>
                <div className="price">$5 a month</div>
                <ul>
                  <li>Ad Free</li>
                  <li>10% Discount</li>
                </ul>
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>

                {/* INFO - PATRIOT PLAN */}
                {this.state.subscriptions.length > 0 ? 
                  // User has a current subscription
                  (this.state.subscriptions[0].plan.product === 'prod_I2y7Q1Dz5Rl9tj' ?
                    // Is this product
                    <button disabled={true} className="commit-button btn btn-articles-light ">Active</button>
                    :
                    // Is another product
                    <button disabled={false} onClick={() => this.createSubscription('prod_I2y7Q1Dz5Rl9tj')} className="commit-button btn btn-articles-light alt">Upgrade</button>
                  )
                :
                  // User has no subscription
                  <div onClick={() => this.createSubscription('prod_I2y7Q1Dz5Rl9tj')} className="commit-button btn btn-articles-light alt">Commit</div>
                }

              </div>

            </div>
          </div>

          <div className="subscription-faq-section">

            <h1>Subscription FAQ</h1>
            <p className="lead">Our most asked questions answered</p>
  
            <Accordion defaultActiveKey="0">
  
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    What is Articles?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Questions like this are better answered in our mission statement which can be read <a target="_blank" className="border-bottom" href="/mission">here.</a></Card.Body>
                </Accordion.Collapse>
              </Card>
  
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Is Articles a Non Profit?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
  
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    How do we plan to use the platform to fix issues in America?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
  
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    Which political party do you align with?
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
  
            </Accordion>
          </div>

          <div className="accordion d-none" id="accordionExample">

            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                  </button>
                </h2>
              </div>

              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Collapsible Group Item #2
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Collapsible Group Item #3
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default FAQ