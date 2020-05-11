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
      <div className="mt-5">

        <div className="">
          <h5>Submissions Info</h5>
        </div>

        <table class="table table-bordered bg-white">
          <thead>
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

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

      </div>
    );
  }
}

export default Submissions