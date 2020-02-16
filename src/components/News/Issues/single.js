import React from 'react';
import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';

class IssueBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: []
    };

  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.issue(this.props.match.params.id).once('value').then(snapshot => {
      const issuesObject = snapshot.val();
      let issuesList = [];

      if ( typeof issuesObject.title === 'string' && issuesObject !== null ) {
       issuesList = {...issuesObject}
      } else {
        issuesList = [];
      }

      this.setState({
        data: issuesList,
        loading: false
      })

    });
    
  }

  prettyPrint = (obj) => {
    // let str = JSON.stringify(obj);
    // str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
    // return str;

    return JSON.stringify(obj,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
  }

  render() {
    return(
      <div>
        {typeof this.state.data.title === 'string' ? 
        <div className="container">
          <div className="card mt-5">
            <h3 className="card-header">{this.state.data.title}</h3>
            <div className="card-body">
              <h5>{this.state.data.slogan}</h5>
              <div className="w-100" style={{background: this.state.data.photoExtra}}>
                <img src={this.state.data.photo} className="img-fluid" alt=""/>
              </div>
              <small className="d-block">Photo Extra Info: {this.state.data.photoExtra}</small>
              <button onClick={() => this.props.history.goBack()} className="btn btn-articles-light">Go Back</button>
            </div>
          </div>
        </div>
        :
        <div style={{height: 'calc(100vh - 30px)', display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', textAlign: 'center', flexWrap: 'wrap'}}>

            <h1>This story does not exist!</h1>
            <button onClick={()  => {this.props.history.goBack()}} className="btn btn-articles-light">Go Back</button>

        </div>
        }
      </div>
    )
  }
}

// const Issue = () => (
//   <div className='container issues-page text-center'>



//     <div className="mt-3">
//       <h1>Issues</h1>
//       <p>Overview of the most pressing issues and status updates on them. </p>
//       <p>Unlike normal stories </p>
//       {/* <p>Monday - blank - Tuesday - blank - Wednesday - blank</p> */}
//     </div>

//     <div className="row mb-5">

//     </div>

//   </div>
// );

const Issue = withFirebase(IssueBase);

export default withRouter(Issue);