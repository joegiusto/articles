import React, {Component} from 'react'
import axios from 'axios'

class Users extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      users: [],
      outsetComplete: 0,
      
      zips: {},

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
    this.props.setLoaction(this.props.tabLocation);

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

        const currentUserZip = self.state.users[i].address.zip

        if (self.state.zips[currentUserZip] === undefined) {
          self.setState({
            zips: {
              ...self.state.zip,
              [self.state.users[i].address.zip]: 0
            }
          })
        }

        self.setState({
          zips: {
            ...self.state.zip,
            [self.state.users[i].address.zip]: self.state.zips[currentUserZip] + 1
          }
        })

        console.log(self.state.zips[currentUserZip])
  
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

  componentWillUnmount() {
    this.props.setLoaction('');
  }

  // TODO - Convert this logic to server side code and use https://www.npmjs.com/package/zipcodes to build local directory as loop goes or after loop is done do one call wuth all zips to get names
  checkZipName(zip) {
    const directory = {
      12524: 'Fishkill'
    }

    if ( Object.keys(directory).indexOf(zip) > -1 ) {

      return( [Object.values(directory)[Object.keys(directory).indexOf(zip)]] )

    } else {

      return( zip )
      
    }
  }

  render() {

    return (
      <div className="admin-users container-fluid mt-3">

        <div className="row">

          <div className="col-12 col-md-4">
  
            <div className="row">
  
              <div className="col-12 col-md-6">
  
                <div className="card">
                  <div className="card-header">Outset</div>
                  <div className="card-body">
                    <div>Outset Complete: {(Math.floor((this.state.outsetComplete / this.state.users.length) * 100))}%</div>
                  </div>
                </div>
  
                <div className="card mt-3">
                  <div className="card-header">Geographical Data</div>
                  <div className="card-body">
  
                    {
                      Object.entries(this.state.zips).map(([key, val]) => 
                          <div key={key}>{this.checkZipName(key)}: {val}</div>
                      )
                    }
  
                  </div>
                </div>
  
              </div>
  
              <div className="col-12 col-md-6">
                <div className="card mt-3 mt-md-0">
                  <div className="card-header">Political</div>
                  <div className="card-body">
                    <div>Republican: {(Math.floor((this.state.republicanParty / this.state.users.length) * 100))}% ({this.state.republicanParty})</div>
                    <div>Democrat: {(Math.floor((this.state.democratParty / this.state.users.length) * 100))}% ({this.state.democratParty})</div>
                    <div>Green: {(Math.floor((this.state.greenParty / this.state.users.length) * 100))}% ({this.state.greenParty})</div>
                    <div>Independent: {(Math.floor((this.state.independentParty / this.state.users.length) * 100))}% ({this.state.independentParty})</div>
                    <div>Articles: {(Math.floor((this.state.articlesParty / this.state.users.length) * 100))}% ({this.state.articlesParty})</div>
                    <div>Other: {(Math.floor((this.state.otherParty / this.state.users.length) * 100))}% ({this.state.otherParty})</div>
                  </div>
                </div>
              </div>
  
            </div>
  
          </div>
  
          <div className="col-12 col-md-8">
  
            <div className="table-responsive">
              <table className="table table-sm table-bordered bg-white">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">State</th>
                    <th scope="col">Outset</th>
                    <th scope="col">Admin</th>
                  </tr>
                </thead>
                <tbody>
    
                  {this.state.users.map(user => (
    
                    <tr>
                      <th scope="row">{user._id}</th>
                      <td>{`${user.first_name} ${user.last_name}`}</td>
                      <td>{user.address.state}</td>
                      <td>{user.outset === true ? 'True' : 'False'}</td>
                      <td>{user.roles?.isAdmin === "true" ? 'True' : 'False'}</td>
                    </tr>
                    
                  ))}
    
                </tbody>
              </table>
            </div>
  
          </div>
          
        </div>

      </div>
    );
  }
}

export default Users