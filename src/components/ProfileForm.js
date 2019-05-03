import React from 'react';

let str = "";

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Test',
      lastName: '',
      email: "example@provider.com",
      party: "None",
      newsletter: false
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePartyChange = this.handlePartyChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handlePartyChange(party) {
    // alert('Party change detected ' + party);
    this.setState({party: party});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    // str = JSON.stringify(this.state);
    str = JSON.stringify(this.state, null, 4); // (Optional) beautiful indented output.
    alert(str); // Displays output using window.alert()

    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="profile-page shadow-sm bg-white p-2">

        <div className="row">
          
          <div className="col-4">
            <div src="..." alt="..." className="rounded-circle profile-photo shadow-sm d-block mx-auto"></div>
          </div>

          <div className="col-8">
            <div className="form-group">
              {/* <label for="exampleInputPassword1">Name:</label> */}
              <div className="form-row pt-2">
                <div className="col-12">
                  <input type="text" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
                </div>
                <div className="col-12 mt-2">
                  <input type="text" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.handleLastNameChange}/>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" disabled className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We can't change emails at this time.</small>
        </div>

        <div className="form-group">
          <div className="dual-header">
            <label for="exampleInputPassword1">Password</label>
            <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
            </small>
          </div>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          <input type="password" className="form-control mt-1" id="exampleInputPassword1" placeholder="Confirm Password"/>
        </div>

        <div className="form-group">
          <div className="dual-header">
            <label for="exampleInputPassword1">Political Affiliation</label>
            <small id="passwordHelpInline" class="text-muted">
              Optional.
            </small>
          </div>

          {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/> */}
          <div class="dropdown">
            <button class={"btn btn-dropdown-" + this.state.party + " dropdown-toggle w-100"} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.party}
            </button>
            <div class="dropdown-menu w-100 subheading-font" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" onClick={() => this.handlePartyChange("None")} href="#"><div className="bg-secondary text-white p-1 rounded"><i className="fas fa-spinner fa-pulse"></i>None</div></a>
              <a class="dropdown-item" onClick={() => this.handlePartyChange("Articles")} href="#"><div className="bg-dark text-white p-1 rounded"><i className="fas fa-spinner fa-pulse"></i>Articles</div></a>
              <a class="dropdown-item" onClick={() => this.handlePartyChange("Democrats")} href="#"><div className="bg-primary text-white p-1 rounded"><i className="fas fa-spinner fa-pulse"></i>Democrats</div></a>
              <a class="dropdown-item" onClick={() => this.handlePartyChange("Green")} href="#"><div className="bg-success text-white p-1 rounded"><img src="https://pbs.twimg.com/profile_images/879486953057595392/KIJlbQcV.jpg" height="20px" alt=""/>Green</div></a>
              <a class="dropdown-item" onClick={() => this.handlePartyChange("Libertarian")} href="#"><div className="bg-warning text-white p-1 rounded"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Libertarian_Party_Porcupine_%28USA%29.svg/1200px-Libertarian_Party_Porcupine_%28USA%29.svg.png" height="20px" alt=""/>Libertarian</div></a>
              <a class="dropdown-item" onClick={() => this.handlePartyChange("Republicans")} href="#"><div className="bg-danger text-white p-1 rounded"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1179px-Republicanlogo.svg.png" height="20px" alt=""/>Republicans</div></a>
            </div>
          </div>

        </div>

        <div className="form-group">
          <div className="dual-header">
            <label for="exampleInputPassword1">Newsletter</label>
            {/* <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
            </small> */}
          </div>

          <div className="radio-switch w-100">
            <div className="dual-header_around">
              <span className="no">No</span>
              <span className="yes">Yes</span>
            </div>
          </div>

        </div>

        {/* <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck"/>
            <label className="form-check-label" for="disabledFieldsetCheck">
              Can't check this
            </label>
          </div>
        </div> */}

        <button className="btn btn-outline-danger" type="submit">Update</button>

      </form>
    )
  }
}