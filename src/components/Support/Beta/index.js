import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import * as ROUTES from '../../../constants/routes'
import { toggleAnimatedSideMenuSectionHeaders } from '../../../actions/siteActions';

function Beta(props) {

	const [AnimatedSideMenuSectionHeaders, setAnimatedSideMenuSectionHeaders] = useState(props.site.animatedSideMenuSectionHeaders);
    const [RealId, setRealId] = useState(false);

    function handleToggleAnimatedSideMenuSectionHeaders() {
        console.log("Toggle Called");
        props.toggleAnimatedSideMenuSectionHeaders();
        setAnimatedSideMenuSectionHeaders(!AnimatedSideMenuSectionHeaders)
    }

    useEffect(() => {
		
		// axios.get('/api/getRevenueMongoose', {

		// })
		// .then( (response) => {
        //     console.log(response)
        //     setDonations(response.data);
		// })
		// .catch( (error) => {
		//     console.log(error);
		// });

	}, []);

    return (
        <div className="beta-page">

            <div className="container">
                <div className="row h-100 justify-content-center">

                    <div className="col-sm-8 my-auto">

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h1>Beta Testing</h1>
                                <p className="mb-4">To help us test upcoming features opt into some of the below features. These features may break parts of the site and cause pages to sop working. During the testing we ask you provide us with a summary of your thoughts and issues you had when using the feature.</p>
                    
                                <div className="beta-item">
                                    {
                                        AnimatedSideMenuSectionHeaders ? <div className="badge badge-success">Enabled</div> : <div className="badge badge-secondary">Not Enabled</div>
                                    }
                                    <div className="text mb-1"><b>Animated Side Menu Section Headers</b></div>
                                    <div className="text mb-3">Animated backgrounds on the headers of sections in the side menu of the site.</div>

                                    <div className="side-menu-section-header-fake-grid">

                                        <div className="side-menu-section-header-fake header-clothing">
                                            <div className="side-menu-section-header-title-fake">Clothing</div>
                                        </div>
                    
                                        <div className="side-menu-section-header-fake header-news">
                                            <div className="side-menu-section-header-title-fake">News</div>
                                        </div>
                    
                                        <div className="side-menu-section-header-fake header-politics">
                                            <div className="side-menu-section-header-title-fake">Politics</div>
                                        </div>
                    
                                        <div className="side-menu-section-header-fake header-community">
                                            <div className="side-menu-section-header-title-fake">Community</div>
                                        </div>

                                    </div>

                                    <hr/>

                                    <div className="articles-switch-wrap">

                                        <div className="switch-label mr-2" onClick={() => handleToggleAnimatedSideMenuSectionHeaders()}>
                                            <span>Enable Feature</span>
                                        </div>
                    
                                        <label for="feature" className="articles-switch mb-0">
                                            <input id="feature" type="checkbox" checked={AnimatedSideMenuSectionHeaders}/>
                                            <span className="slider" onClick={() => handleToggleAnimatedSideMenuSectionHeaders()}></span>
                                        </label>

                                    </div>

                                </div>
                            
                                <div className="beta-item">
                                    {
                                        RealId ? <div className="badge badge-success">Enabled</div> : <div className="badge badge-secondary">Not Enabled</div>
                                    }
                                    <div className="text mb-1"><b>Real ID</b></div>
                                    <div className="text mb-3">Identify yourself as a real citizen and gain access to sections of the site and conversations reserved only fore verified users.</div>

                                    {/* <div className="text-muted mb-3">Valid ID - Drivers License, Passport</div> */}

                                    <hr/>

                                    <div className="d-flex flex-column flex-lg-row justify-content-md-around">

                                        <div className="front text-center">
                                            <div className="text-muted">Front of ID</div>
                                            <button className="btn btn-articles-light mx-auto d-block">
                                                <i class="fas fa-upload"></i> Upload
                                            </button>
                                        </div>

                                        <div className="back text-center mt-3 mt-lg-0">
                                            <div className="text-muted">Back of ID</div>
                                            <button className="btn btn-articles-light mx-auto d-block">
                                                <i class="fas fa-upload"></i> Upload
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div style={{backgroundColor: 'rgb(49 49 49);'}} className="card-footer py-3 text-center">
                                <Link to={ROUTES.COMMUNITY}>
                                    <button className="btn btn-articles-light">
                                        <h4 className="mb-0"><i class="far fa-caret-square-left"></i>Support Hub</h4>
                                    </button>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

// const Page = () => (

// );

// export default Beta

const mapStateToProps = (state) => {

    return {
      site: state.site,
    };
  
  };

export default connect(
    mapStateToProps, 
    { toggleAnimatedSideMenuSectionHeaders } 
  )(Beta);