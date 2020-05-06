import React, {Component} from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Test = () => {
  return (
    <div>Hello</div>
  )
}

class EmployeesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }
  }

  componentDidMount() {
    console.log("Mounted!")
  }

  render() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    return(
      <div className="employees-page">
        <div className="container h-100">

          <div className="search-bar">

            <span role="img" aria-label="Anonymous Emoji" className={"search-letter" + (this.state.searchTerm === "anonymous" ? ' active' : '')} onClick={() => (this.setState({searchTerm: "anonymous"}))}>⛔</span>

            {alphabet.map(letter => (
              <span className={"search-letter"  + (this.state.searchTerm === letter ? ' active' : '')} onClick={() => (this.setState({searchTerm: letter}))}>{letter}</span>
            ))}

          </div>

          <div className="row h-100 justify-content-center">

           <Switch>
            <Route exact path={ROUTES.EMPLOYEES} component={Test}/>
            <Route path={ROUTES.EMPLOYEES_DETAILS} component={Test}/>
           </Switch>

            <div className="col-sm-6 my-auto">
              <div className="card card-block p-5">
                <h1>Employee Directory</h1>
                <p>As part of our transparency efforts we provide a directory of our employees to the public along with some details about them and payrole info. Please, snoop around! :)</p>
              </div>
            </div>
  
          </div>

        </div>
      </div>
    )
  }
}

export default EmployeesPage;