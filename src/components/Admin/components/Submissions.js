import React, {Component} from 'react'
import axios from 'axios'

class Submissions extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      submissions: [],
    };

  }

  componentDidMount() {
    this.props.setLoaction(this.props.tabLocation);
    const self = this;

    axios.get('/getSubmissions')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        submissions: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        submissions: [],
      })
    });
  }

  componentWillUnmount() {
    this.props.setLoaction('');
  }

  render() {

    return (
      <div className="admin-submissions container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="admin-side-by-side-form">

              <div className="form-group">
                <input className="form-control" type="text" value="" placeholder="Title"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="text" value="" placeholder="User ID"/>
              </div>

              <div className="form-group">
                <textarea className="form-control" type="text" rows="5" placeholder="Notes"/>
              </div>

              {/* <div className="form-group">
                <input className="form-control" type="text" placeholder="File"/>
              </div> */}

              <div className="submit">
                <div className="btn btn-articles-light w-100">Submit</div>
              </div>

            </div>

          </div>

          <div className="col-12 col-md-8">
            <table className="table table-sm table-bordered bg-white mt-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Title</th>
                  <th scope="col">Actions</th>
                  {/* <th scope="col">Price</th> */}
                  {/* <th scope="col">Card Photos</th> */}
                </tr>
              </thead>
              <tbody>

                {this.state.submissions.map(product => (

                  <tr>
                    <th scope="row">{product.user_id}</th>
                    <td>{product.title}</td>
                    <td><div className="badge badge-danger">Delete</div></td>
                    {/* <td>${product.price / 100}</td> */}
                    {/* <td>p-c</td> */}
                  </tr>
                  
                ))}

              </tbody>
            </table>
          </div>

        </div>

        

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

      </div>
    );
  }
}

export default Submissions