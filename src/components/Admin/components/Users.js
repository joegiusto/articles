import React, {Component} from 'react'
import axios from 'axios'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      confirm: false
    };

  }

  handleClick() {

    if (this.state.confirm) {
      this.props.afterConfirm()
    } else {
      this.setState({confirm: true})
    }

  }

  render() {
    return (
      this.state.confirm ? 
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Confirm</div>
      :
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Delete</div>
    )
  }
}

class Users extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      users: [],
      outsetComplete: 0,
      
      zips: {
        // Is capital for display purposes, changing this to lowercase will show in reports
        None: 0
        // The rest of the zips get populated once data loads
      },

      zipsToTown: {},

      gender: {
        male: 0,
        female: 0,
        other: 0,
      },

      articlesParty: 0,
      republicanParty: 0,
      democratParty: 0,

      independentParty: 0,
      greenParty: 0,
      libertarianParty: 0,
      constitutionParty: 0,
      reformParty: 0,
      legalMarijuanaNowParty: 0,
      socialistEqualityParty: 0,
      justiceParty: 0,
      
      otherParty: 0
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

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

        switch(self.state.users[i].political?.party) {
          case 'articles':
            self.setState({
             articlesParty: self.state.articlesParty + 1
            })
            break;
          case 'democrat':
            self.setState({
              democratParty: self.state.democratParty + 1
             })
             break;
          case 'republican':
            self.setState({
              republicanParty: self.state.republicanParty + 1
             })
             break;
          case 'independent':
            self.setState({
              independentParty: self.state.independentParty + 1
             })
             break;
          case 'green':
            self.setState({
              greenParty: self.state.greenParty + 1
             })
             break;
          case 'libertarian':
            self.setState({
              libertarianParty: self.state.libertarianParty + 1
             })
             break;
          case 'constitution':
            self.setState({
              constitutionParty: self.state.constitutionParty + 1
             })
             break;
          case 'reform':
            self.setState({
              reformParty: self.state.reformParty + 1
            })
            break;
          case 'legal-marijuana-now':
            self.setState({
              legalMarijuanaNowParty: self.state.legalMarijuanaNowParty + 1
            })
            break;
          case 'socialist-equality':
            self.setState({
              socialistEqualityParty: self.state.socialistEqualityParty + 1
            })
            break;
          case 'justice':
            self.setState({
              justiceParty: self.state.justiceParty + 1
            })
            break;
          default:
            self.setState({
              otherParty: self.state.otherParty + 1
            })
        }

        switch(self.state.users[i].gender) {
          case 'male':
            self.setState({
              gender: {
                ...self.state.gender,
                male: self.state.gender.male + 1
              }
            })
            break;
          case 'female':
            self.setState({
              gender: {
                ...self.state.gender,
                female: self.state.gender.female + 1
              }
             })
             break;
          default:
            self.setState({
              gender: {
                ...self.state.gender,
                other: self.state.gender.other + 1
              }
            })
        }

        const currentUserZip = self.state.users[i].address.zip
        console.log(self.state.zips[currentUserZip])
  

        if (currentUserZip === undefined || currentUserZip === null || currentUserZip === "") {

          self.setState({
            zips: {
              ...self.state.zips,
              None: self.state.zips.None + 1
            }
          })

        } else {

          self.setState({
            zips: {
              ...self.state.zips,
              [self.state.users[i].address.zip]: (!isNaN(self.state.zips[currentUserZip]) ? (self.state.zips[currentUserZip] + 1) : 1)
            }
          })

        }

      }

      axios.post('/api/secure/zipToTown', {
        zips: self.state.zips,
        format: 'tally'
      })
      .then((response) => {
        console.log(response.data)

        self.setState({
          zipsToTown: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });

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
    this.props.setLocation('');
  }

  // TODO - Convert this logic to server side code and use https://www.npmjs.com/package/zipcodes to build local directory as loop goes or after loop is done do one call wuth all zips to get names
  checkZipName(zip) {

    // Old way, MongoDB now has collection of every US Zip code
    const directory = {
      12508: "Beacon",
      12524: 'Fishkill',
      12533: "Hopewell Junction",
      12561: "New Paltz"
    }

    if ( Object.keys(this.state.zipsToTown).indexOf(zip) > -1 ) {

      return(  Object.values(this.state.zipsToTown)[Object.keys(this.state.zipsToTown).indexOf(zip)].city )

    } else {

      return( zip )
      
    }
  }

  toggleRole(user_id, role, permission) {
    const self = this;

    // console.log(`Changing the role for user ${user_id} of ${role} to ${permission}`);
    // const index = this.state.users.findIndex((user) => user._id === user_id)

    

    axios.post('/api/secure/toggleRole', {
      _id: user_id,
      role: role,
      permission: permission
    })
    .then(function (response) {

      console.log(response);

      self.setState(prevState => ({

        users: prevState.users.map(
          el => el._id === user_id ? { ...el, roles: { ...el.roles, [role]: permission} } : el
        )
  
      }));

    })
    .catch(function (error) {
      console.log(error.response);
    });
  }

  removeUser(id) {
    const self = this;

    axios.post('/api/deleteUser', {
      _id: id 
    })
    .then(function (response) {

      // socket.emit('deleteUser', id);

      self.setState({
        users: self.state.users.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error.response);
    });
  }

  createCustomer(_id, email) {
    const self = this;

    console.log(`Trying to create a stripe customer for ${_id}`)

    axios.post('/api/createCustomer', {
      _id: _id,
      email: email
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="admin-page admin-users">

        <div className="side-panel">

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

          <div className="card mt-3">
            <div className="card-header">Gender Data</div>
            <div className="card-body">

              <div>Male: {(Math.floor((this.state.gender.male / this.state.users.length) * 100))}% ({this.state.gender.male})</div>
              <div>Female: {(Math.floor((this.state.gender.female / this.state.users.length) * 100))}% ({this.state.gender.female})</div>
              <div>Other: {(Math.floor((this.state.gender.other / this.state.users.length) * 100))}% ({this.state.gender.other})</div>

            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">Political</div>
            <div className="card-body">

              <div>Articles: {(Math.floor((this.state.articlesParty / this.state.users.length) * 100))}% ({this.state.articlesParty})</div>
              <div>Republican: {(Math.floor((this.state.republicanParty / this.state.users.length) * 100))}% ({this.state.republicanParty})</div>
              <div>Democrat: {(Math.floor((this.state.democratParty / this.state.users.length) * 100))}% ({this.state.democratParty})</div>

              <div>Independent: {(Math.floor((this.state.independentParty / this.state.users.length) * 100))}% ({this.state.independentParty})</div>
              <div>Green: {(Math.floor((this.state.greenParty / this.state.users.length) * 100))}% ({this.state.greenParty})</div>
              <div>Libertarian: {(Math.floor((this.state.libertarianParty / this.state.users.length) * 100))}% ({this.state.libertarianParty})</div>
              <div>Constitution: {(Math.floor((this.state.constitutionParty / this.state.users.length) * 100))}% ({this.state.constitutionParty})</div>
              <div>Reform: {(Math.floor((this.state.reformParty / this.state.users.length) * 100))}% ({this.state.reformParty})</div>
              <div>Legal Marijuana: {(Math.floor((this.state.legalMarijuanaNowParty / this.state.users.length) * 100))}% ({this.state.legalMarijuanaNowParty})</div>
              <div>Socialist Equality: {(Math.floor((this.state.socialistEqualityParty / this.state.users.length) * 100))}% ({this.state.socialistEqualityParty})</div>
              <div>Justice: {(Math.floor((this.state.justiceParty / this.state.users.length) * 100))}% ({this.state.justiceParty})</div>
            
              <div>Other: {(Math.floor((this.state.otherParty / this.state.users.length) * 100))}% ({this.state.otherParty})</div>

            </div>
          </div>

        </div>

        <div className="main-panel">

          <div className="table-responsive">
            <table className="table table-sm table-bordered bg-white">
              <thead className="thead-dark">
                <tr>
                  {/* <th scope="col">User ID</th> */}
                  <th width="400px" scope="col">Name</th>
                  <th scope="col">Stripe</th>
                  <th scope="col">Membership</th>
                  <th scope="col">State</th>
                  <th scope="col">Party</th>
                  <th scope="col">Outset</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Dev</th>
                  <th scope="col">Writer</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>

                {this.state.users.map(user => (

                  <tr key={user._id}>
                    {/* <th scope="row">{user._id}</th> */}
                    {/* <td>{`${user.first_name} ${user.last_name}`}</td> */}
                    <td>
                      <img alt="" className="profile-photo" style={{borderRadius: '100px'}} width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${user._id}.jpg` || ''}/>
                      <span style={{width: '150px', display: 'inline-block'}}>{user.first_name} {user.last_name}</span> <span className="badge badge-light">{user._id}</span>
                    </td>

                    {/* <td>{user.stripe?.customer_id === undefined ? <span>No<span onClick={() => this.createCustomer(user._id)} className="btn btn-sm btn-articles-light">Create</span></span> : 'Yes'}</td> */}
                    <td>

                        {/* Production Customer ID */}
                        {user.stripe?.customer_id ? 

                          <OverlayTrigger
                            key={'customer_id'}
                            placement={'bottom'}
                            overlay={
                              <Tooltip id={`tooltip-${'bottom'}`}>
                                <i class="far fa-clipboard"></i>{user.stripe?.customer_id}
                              </Tooltip>
                            }
                          >
                            <div style={{cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(user.stripe?.customer_id)}} className="badge badge-primary mr-1">Prod</div>
                          </OverlayTrigger>

                          :

                          <div style={{cursor: 'pointer'}} onClick={() => this.createCustomer(user._id)} className="badge badge-success">Add Customer</div>

                        }

                        {/* Development Customer ID */}
                        {user.stripe?.customer_test_id && 

                          <OverlayTrigger
                            key={'customer_test_id'}
                            placement={'bottom'}
                            overlay={
                              <Tooltip id={`tooltip-${'bottom'}`}>
                                <i class="far fa-clipboard"></i>{user.stripe?.customer_test_id}
                              </Tooltip>
                            }
                          >
                            <div style={{cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(user.stripe?.customer_test_id)}} className="badge badge-warning">Dev</div>
                          </OverlayTrigger>

                        }

                      </td>

                    <td>
                      <span className="badge badge-danger">No</span>
                      <span onClick={() => this.createCustomer(user._id, user.email)} className="badge badge-dark ml-2">Edit</span>
                    </td>

                    <td>{user.address.state}</td>
                    <td>{user.political?.party || 'None'}</td>
                    <td>{user.outset === true ? 'True' : 'False'}</td>
                    <td>{user.roles?.isAdmin === true ? <div onClick={() => this.toggleRole(user._id, 'isAdmin', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isAdmin', true )} className="badge badge-success">False</div>}</td>
                    <td>{user.roles?.isDev === true ? <div onClick={() => this.toggleRole(user._id, 'isDev', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isDev', true )} className="badge badge-success">False</div>}</td>
                    <td>{user.roles?.isWriter === true ? <div onClick={() => this.toggleRole(user._id, 'isWriter', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isWriter', true )} className="badge badge-success">False</div>}</td>
                    <td><ConfirmDelete afterConfirm={() => this.removeUser(user._id)}></ConfirmDelete></td>
                  </tr>
                  
                ))}

              </tbody>
            </table>
          </div>

        </div>

      </div>
    );
  }
}

export default Users