import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class SubscriptionCard extends Component {
  render(props) {
    const {object} = this.props;
    return (
      <div key={object.id} className="subscription" style={ (object.photoExtra ? {background: object.photoExtra + ", url(" + object.photo + ")"} : {background: "url(" + object.photo + ")"} ) }>
        <div className="uid">{object.uid}</div>
        <div className="title">{object.title}</div>
        <div className="slogan">{object.slogan}</div>
        {/* <span>{object.uid}</span> */}
        <div>
          <div className="w-50">
            <span className="states badge badge-dark w-100">View</span>
            {/* <span className="city badge badge-dark ml-1">{object.interest.city}</span> */}
          </div>

          <div className="dual-header"> 
            {/* <div className="w-50">
              <span className="w-50 states badge badge-dark">{object.interest.states}</span>
              <span className="w-50 city badge badge-dark">{object.interest.city}</span>
            </div> */}
            <div className="w-50">
              <span className="states badge badge-dark w-100">0 Updates</span>
              {/* <span className="city badge badge-dark ml-1">{object.interest.city}</span> */}
            </div>

            {/* Replaced with Dropdown */}
            {/* <div><span className="settings badge badge-light"><i class="fas fa-cog m-0"></i></span></div> */}

            <Dropdown drop={"up"}>

              <Dropdown.Toggle className="settings badge badge-light" id="dropdown-custom-1"><i class="fas fa-cog m-0"></i></Dropdown.Toggle>

              <Dropdown.Menu alignRight className="dropdown-custom pull-right noselect">
                <Dropdown.Item eventKey="1">Clear Updates</Dropdown.Item>
                <Dropdown.Item eventKey="2">Unsubscribe</Dropdown.Item>
                {/* <Dropdown.Item eventKey="3">
                  Active Item
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
              </Dropdown.Menu>

            </Dropdown>

            {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton> */}

          </div>
        </div>
      </div>
    )
  }
};

export default SubscriptionCard;
