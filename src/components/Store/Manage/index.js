import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withEmailVerification } from '../../Session';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const AdminPage = () => (

    <div className="manage-page container">

      <div className="is-admin">
        <Link to={ROUTES.STORE}><button className="btn btn-articles-light">Admin: Store</button></Link>
      </div>

      <div>
        <h1>Store Management</h1>
        <p>Portal for admin and designer roles to manage product details.</p>
        <Switch>
          <Route exact path={ROUTES.STORE_MANAGE_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.STORE_MANAGE} component={IssuesList} />
        </Switch>
      </div>
    </div>

);

class IssuesListBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loadingStories: false,
      loadingIssues: false,
      loadingMyths: false,

      firebaseClothing: [],

      id: "",
      title: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  convert(fakeArray) {

    if (fakeArray !== undefined) {
      const str = [...fakeArray.split(",")];
      console.log(str.length);

      return (str);
      
    } else {
      return undefined;
    }

  }

  componentDidMount() {
    // this.onListenForNews();
    this.setState({ loadingIssues: true });

    this.props.firebase.store().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => (
        {
          ...usersObject[key],
          // statesArray: this.convert(usersObject[key].interest.states),
          uid: key,
        }
      ));

      this.setState({
        firebaseClothing: usersList,
        loadingIssues: false,
      });

    });
    
  }

  componentWillUnmount() {
    this.props.firebase.issues().off();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addIssue() {
    
    this.props.firebase.issue(this.state.id).set({

      title: this.state.title,
      interest: {
        states: "None",
        city: 'None'
      } 

    });

    this.setState({

      id: '', 
      title: '', 

    });
  }

  removeIssue(id) {
    this.props.firebase.issue(id).set({

    })
  }

  render() {
    const { firebaseClothing, firebaseStories, firebaseMyths, loading } = this.state;

    return (
      <div className="row">

        <div className="col-12 col-md-4">
          <div className="news-manage-card stories">
            <div className="header">
              <h4>Products</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Products</span>
                  <span className="sort-selection">Search Products</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseClothing.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    {/* <strong>States:</strong>  */}
                    {/* {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) } */}
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.STORE_MANAGE}/${user.uid}`}>
                      Edit
                    </Link>

                    {/* <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span> */}

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Product</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Product ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Product Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

// const UserItem = ({ match }) => (
//   <div>
//   <h2>Editing Issue ({match.params.id})</h2>

//   </div>
// );

class UserItemBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      title: "",
      price: "",
      id: "",
      sale: {
        active: false,
        // Can be percent or amount
        type: "",
        amount: 0
        
      },
      // Can be Original, Submission, Sponsered, Partnership
      type: "Original",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    console.log(this.props.match.params.id);

    this.props.firebase.store_item(this.props.match.params.id).once('value').then(snapshot => {

      // const issuesObject = snapshot.val();

      // console.log(snapshot.val().color);

      // const issuesList = Object.keys(issuesObject).map(key => (
      //   {
      //     ...issuesObject[key],
      //     uid: key,
      //   }
      // ));

      this.setState({
        ...this.state,
        ...snapshot.val(),
        price: snapshot.val().price / 100
      });

    });

  }

  render() {
    const { match } = this.props;
    const { title, price, sale: {amount} } = this.state;
    return(
      <div className="product-manage">

        <Link to={ROUTES.STORE_MANAGE}><small>Back to all</small></Link>
  
        <div className="row">

          <div className="col-6">

            <div className="manage-card mb-3">
              <h1>{match.params.id}</h1>

              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Product Name</label>
                <div className="col-sm-9">
                  <input
                    name="title"
                    type="text" 
                    className="form-control" 
                    id="inputEmail3"
                    value={title}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Price</label>
                <div className="col-sm-9">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">$</span>
                    </div>
                    <input 
                      name="price"
                      type="number" 
                      className="form-control" 
                      placeholder="Username" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1" 
                      value={price}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Display</label>
                <div className="col-sm-9">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option selected disabled="disabled">Select One</option>
                  <option>articles</option>
                  <option>info</option>
                  <option>danger</option>
                  <option>primary</option>
                </select>
                <small id="emailHelp" className="form-text text-muted">Add a <Link to="">display property</Link> (must be approved by admin)</small>
                </div>
              </div>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Collection</label>
                <div className="col-sm-9">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option selected disabled="disabled">Select One</option>
                  <option>First Launch</option>
                  <option>The Blank Collections</option>
                  <option>*Company* Partnership</option>
                </select>
                <small id="emailHelp" className="form-text text-muted">Add a <Link to="">collection</Link> (must be approved by admin)</small>
                </div>
              </div>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Type</label>
                <div className="col-sm-9">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option selected disabled="disabled">Select One</option>
                  <option>Original</option>
                  <option>Submission</option>
                  <option>Partnership</option>
                  <option>Sponsered</option>
                </select>
                </div>
              </div>
  
              <hr/>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">On Sale?</label>
                <div className="col-sm-9">
  
                  <div className="mb-3">
                    <div className="btn btn-articles-light">Percent Sale</div>
                    <div className="btn btn-articles-light ml-1">Amount Sale</div>
                    <div className="btn btn-articles-light ml-1">None</div>
                  </div>
  
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">$</span>
                    </div>
                    <input 
                      name="title"
                      type="text" 
                      className="form-control" 
                      placeholder="Username" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1" 
                      value={amount}
                      onChange={this.handleInputChange}
                    />
                  </div>
  
                </div>
              </div>
  
              <hr/>
  
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Photos</label>
                <div className="col-sm-9">
  
                  <div className="showcase-photos pb-1 mb-3 border-bottom">
                    <h5>Showcase</h5>
                    <span className="photo">1</span>
                    <span className="photo">2</span>
                    <span className="photo">3</span>
                    <span className="photo">4</span>
                    <span className="photo">5</span>
                    <span className="photo">6</span>
                  </div>
  
                  <div className="product-photos pb-1 mb-3 border-bottom">
                    <h5>Artwork</h5>
                    <span className="photo">1</span>
                    <span className="photo">2</span>
                    <span className="photo">3</span>
                    <span className="photo">4</span>
                    <span className="photo">5</span>
                    <span className="photo">6</span>
                  </div>

                  <h5>Add</h5>
                  <div className="row mb-3">
                    <div className="col-6">
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option selected>Showcase</option>
                        <option>Artwork</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option selected >Slot 1</option>
                        <option>Slot 2</option>
                        <option>Slot 3</option>
                        <option>Slot 4</option>
                        <option>Slot 5</option>
                        <option>Slot 6</option>
                      </select>
                    </div>

                    <div className="col-12 mt-3">
                      <div className="input-group mb-3">
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                          <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                      </div>
                      <div className="btn btn-articles-light w-100">Upload</div>
                    </div>

                  </div>
  
                </div>
              </div>

              <div className="footer dual-header">
                <div className="update">Update</div>
                <div className="delete">Delete</div>
              </div>
            </div>

            

          </div>

        </div>

      </div>

    )
  }
}

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const IssuesList = withFirebase(IssuesListBase);

const UserItem = withFirebase(UserItemBase);

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);