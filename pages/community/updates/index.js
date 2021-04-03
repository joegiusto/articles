import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'

const Page = (props) => (
  <div className="updates-page">

    <div className="container">
      <h1>Updates</h1>
    </div>

  </div>
);

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

            <Head>
                <title>Updates - Articles</title>
            </Head>

            <div className="header">

            {/* <img className="d-block mb-3" src="https://cdn.articles.media/email/logo.jpg" alt=""/> */}
            <div className="mb-1">
                <Image
                    src="https://cdn.articles.media/email/logo.jpg"
                    alt="Articles Media Logo"
                    width="110px"
                    height="110xp"
                />
            </div>

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

export default Updates