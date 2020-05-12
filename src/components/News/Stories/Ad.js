import React from 'react';

class Ad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adDetailsExpanded: false,
      actionButtonExpanded: false
    };

  }

  componentDidMount() {

  }

  adDetailsExpandedToggle() {
    this.setState({
      adDetailsExpanded: !this.state.adDetailsExpanded
    })
  }
  
  render(props) {

    return (
      <div className="ad">

        <div className={"details-slide-out " + (this.state.adDetailsExpanded ? 'expand' : '')}>
          <div>This ad is being shown to you for the following reasons</div>
          <hr/>
          <div className="badge badge-light">Bank Square</div>
          <div>Is advertising to all zip codes within a</div>
          <span><div className="badge badge-light">15 Mile Radius</div></span>
          <div>of it's business</div>
          <hr/>
          <div>Your Zip code</div>
          <span><div className="badge badge-light">12524</div></span>
          <div>is</div>
          <div className="badge badge-light">1.7 miles away</div>
          <hr/>
          <div className="mt-5 pt-5">As always all ads we display to you will be completly transparent and follow our privacy policy.To change your Zip code settings click here (Note to testers this is hard edited in so this page is not working yet)</div>
        </div>

        <div className="photo-banner">
          <div className="ad-warning">Ad</div>

          <div className="logo">
            <img src="https://i.pinimg.com/originals/85/0d/54/850d54feba288afe7fb40a93283fde56.jpg" alt=""/>
          </div>

          <div className="icon">
            <i class="fas fa-mug-hot"></i>
          </div>

          <img className="photo" src="https://media-cdn.tripadvisor.com/media/photo-s/0c/8b/a7/c7/photo0jpg.jpg" alt=""/>
        </div>

        <div className="details">

          <div className="detail">
            <span className="icon"><i class="fas fa-store-alt"></i></span>
            <span>Bank Square</span>
          </div>

          <div className="detail">
            <span className="icon"><i class="fas fa-search-location"></i></span>
            <span>Beacon, NY</span>
          </div>

          <div className="detail">
            <span className="icon"><i class="fas fa-user-friends"></i></span>
            <span>5-10 Employees</span>
          </div>

          <div className="action">
            Menu
          </div>

          <div onClick={() => this.adDetailsExpandedToggle()} className="explanation">
            Ad Details
          </div>

        </div>

      </div>
    )
  }
}

export default Ad;