import React, { useState, useEffect, Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import * as ROUTES from '../../../constants/routes';

function Updates(props) {
    const [tab, setTab] = useState('General');
    const [updatesLoading, setUpdatesLoading] = useState(false);
    const [updatesGeneral, setUpdatesGeneral] = useState([]);
    const [updatesDevelopment, setUpdatesDevelopment] = useState([]);

    useEffect(() => {

        setUpdatesLoading(true)
		
		axios.post('/api/getUpdates', {})
        .then( (response) => {
            setUpdatesGeneral(response.data)
            setUpdatesLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        });

	}, []);

    return (
        <section className="updates-page">

            <div className="header">
            <img className="d-block mb-3" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
            <h2 className="">Updates</h2>
            </div>

            <div className="blog-nav">
                <div onClick={() => setTab('General')} className={"link " + (tab === 'General' ? 'active' : '')}>General</div>
                <div onClick={() => setTab('Development')} className={"link " + (tab === 'Development' ? 'active' : '')}>Development</div>
            </div>

            <div className="main container">

                {/* <DropdownButton className="mb-3" id="update-sort" title="Sort: Newest" variant={'articles-light'}>
                    <Dropdown.Item href="#/action-1">Oldest</Dropdown.Item>
                </DropdownButton> */}

                {updatesLoading && 
                    <div>Loading</div>
                }

                {tab === 'General' &&
                updatesGeneral.map( update => 

                    <Link to={`${ROUTES.UPDATES}/${update.url}`}> 
                    <div className="card update-card">

                        <div className="card-body">
                        <div className="date">{moment(update.date).format('LL')}</div>

                        <h3 className="mb-2">{update.title}</h3>

                        <div className="text">{update.previewText}</div>

                        <div className="d-flex justify-content-between mt-2">

                            <div className="posted-by">
                            <b>Posted By:</b> {update.postedBy}
                            </div>

                        </div>

                        </div>

                        <div className="card-footer update-footer"></div>

                    </div>
                    </Link>

                )
                }

                {tab === 'Development' &&
                updatesDevelopment.map( update => 

                    <Link to={`${ROUTES.UPDATES}/${update.url}`}> 
                    <div className="card update-card">

                        <div className="card-body">
                        <div className="date">{moment(update.date).format('LL')}</div>

                        <h3 className="mb-2">{update.title}</h3>

                        <div className="text">{update.previewText}</div>

                        <div className="d-flex justify-content-between mt-2">

                            <div className="posted-by">
                            <b>Posted By:</b> {update.postedBy}
                            </div>

                        </div>

                        </div>

                        <div className="card-footer update-footer"></div>

                    </div>
                    </Link>

                )
                }
            
            </div>

        </section>
    )
}

class UpdatesOld extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'General',
      general_updates: [],
      development_updates: []
    }
  }

  componentDidMount() {

    axios.get('/api/getUpdates', {})
    .then( (response) => {
      this.setState({
        general_updates: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <section className="updates-page">

        <div className="header">
          <img className="d-block mb-3" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
          <h2 className="">Updates</h2>
        </div>

        <div className="blog-nav">
          <div onClick={() => this.setState({tab: 'General'})} className={"link " + (this.state.tab === 'General' ? 'active' : '')}>General</div>
          <div onClick={() => this.setState({tab: 'Development'})} className={"link " + (this.state.tab === 'Development' ? 'active' : '')}>Development</div>
        </div>

        <div className="main container">

          <DropdownButton className="mb-3" id="update-sort" title="Sort: Newest" variant={'articles-light'}>
            <Dropdown.Item href="#/action-1">Oldest</Dropdown.Item>
          </DropdownButton>

          {this.state.general_updates.map( update => 

            <Link to={`${ROUTES.UPDATES}/${update.url}`}> 
              <div className="card update-card">

                <div className="card-body">
                  <div className="date">{moment(update.date).format('LL')}</div>

                  <h3 className="mb-2">{update.title}</h3>

                  <div className="text">{update.previewText}</div>

                  <div className="d-flex justify-content-between mt-2">

                    <div className="posted-by">
                      <b>Posted By:</b> {update.postedBy}
                    </div>

                  </div>

                </div>

                <div className="card-footer update-footer"></div>

              </div>
            </Link>

          )}
          
        </div>

      </section>
    )
  }
}

export default Updates