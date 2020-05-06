import React, {Component} from 'react'
import axios from 'axios'

class Users extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      users: [],
      outsetComplete: 0,
      
      republicanParty: 0,
      democratParty: 0,
      greenParty: 0,
      independentParty: 0,
      articlesParty: 0,
      otherParty: 0
    };

  }

  componentDidMount() {
    const self = this;

    axios.post('/api/secure/getUsers')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        users: response.data.users,
      });

      for (var i=0; i < self.state.users.length; i++) {
        // console.log(i)
        // console.log(self.state.users[i].outset)
  
        if (self.state.users[i].outset === true ) {
          self.setState({
            outsetComplete: (self.state.outsetComplete + 1)
          })
        }

        switch(self.state.users[i].political.party) {
          case 'republican':
            self.setState({
              republicanParty: self.state.republicanParty + 1
             })
             break;
          case 'democrat':
            self.setState({
              democratParty: self.state.democratParty + 1
             })
             break;
          case 'green':
            self.setState({
              greenParty: self.state.greenParty + 1
             })
             break;
          case 'independent':
            self.setState({
              independentParty: self.state.independentParty + 1
             })
             break;
          case 'articles':
            self.setState({
             articlesParty: self.state.articlesParty + 1
            })
            break;
          default:
            self.setState({
              otherParty: self.state.otherParty + 1
            })
        }
  
      }

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        users: [],
        outsetComplete: 0,
      })
    });
  }

  // calc(user) {

  // }

  render() {

    return (
      <div className="mt-5">

        <div className="">
          <h5>User Info</h5>
        </div>

        <table class="table table-bordered bg-white">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Outset</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody>

            {this.state.users.map(user => (

              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.outset === true ? 'True' : 'False'}</td>
                <td>{user.roles.isAdmin === "true" ? 'True' : 'False'}</td>
              </tr>
              
            ))}

          </tbody>
        </table>

        <div className="mt-5">
          <h5>User Info Stats</h5>
        </div>

        <div className="row">

          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-header">Outset</div>
              <div className="card-body">
                <div>Outset Complete: {(Math.floor((this.state.outsetComplete / this.state.users.length) * 100))}%</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card mt-3 mt-md-0">
              <div className="card-header">Political</div>
              <div className="card-body">
                <div>Republican: {(Math.floor((this.state.republicanParty / this.state.users.length) * 100))}%</div>
                <div>Democrat: {(Math.floor((this.state.democratParty / this.state.users.length) * 100))}%</div>
                <div>Green: {(Math.floor((this.state.greenParty / this.state.users.length) * 100))}%</div>
                <div>Independent: {(Math.floor((this.state.independentParty / this.state.users.length) * 100))}%</div>
                <div>Articles: {(Math.floor((this.state.articlesParty / this.state.users.length) * 100))}%</div>
                <div>Other: {(Math.floor((this.state.otherParty / this.state.users.length) * 100))}%</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Users