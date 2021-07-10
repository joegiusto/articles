import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import axios from 'axios'

import ROUTES from 'components/constants/routes'
import StoreLayout from 'components/layouts/store.js';
import StoreItemBeta from 'components/store/StoreItem';

import picHero from 'public/images/store/hero.jpg'

class StorePage extends Component {
    constructor(props) {
    super(props);
  
      this.state = {
          loadingProducts: false,
          products: [],
          userSavedProducts: [],
          popOutVisible: false,
          currentPopOut: "",
          currentPopOutPhoto: ""
      };
          
      this.setPopOut = this.setPopOut.bind(this);
  
      }
  
      setPopOut(state, product) {
          this.setState({
              popOutVisible: state,
              currentPopOut: product || this.state.currentPopOut,
          }, () => {
              this.setState({
                  currentPopOutPhoto: this.state.currentPopOut.photos?.one
              })
          })
      }
  
      componentDidMount() {
  
          const self = this;
          this.setState({ loadingProducts: true });
  
          axios.get('/api/store/products')
          .then(function (response) {
              console.log(response.data.news);
              self.setState({
                  products: response.data,
                  loadingProducts: false
              });
          })
          .catch(function (error) {
              console.log(error);
              self.setState({ loadingProducts: true });
              self.setState({ resultsLoadingError: error });
          });
  
      }
      
      render() {
          
          return(
                <section className="store-page">

                    <Head>
                        <title>Store Home - Articles</title>
                    </Head>
    
                    {/* <Route exact path={[ROUTES.STORE, ROUTES.STORE_VIEW]} render={() => ( */}
                    <div>
                        <div className="hero">

                            {/* Todo - Diffretn Header Image based on the color mode that is active, I want this back in */}
                            {/* <img src={ (this.props.colorModeDark ? heroDark : hero) } alt=""/> */}
                            <Image
                                src={picHero}
                                alt="People wearing branded Articles clothing"
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                            />
        
                            <div className="notice">
                            
                            </div>
        
        
                            {/* <div className="showcase">
        
                            </div> */}
        
        
                            <div className="hero-content">
                                <div className="title">Founders Collection</div>
                                <div className="text">Our first clothing drop</div>
                                <div className="btn btn-articles-light mt-2">Shop</div>
                                <div className="bottom"></div>
                            </div>
        
                        </div>
    
                            {/* Items */}
                            <div className="container">
                                <div className="store-section-wrap">
                
                                    <div className="store-section">
                                        <h3>Hoodies</h3>

                                        {/* <div className="background">
                                            <img src="https://mymodernmet.com/wp/wp-content/uploads/archive/w-leZAxreDXSpoMROe6G_1082098865.jpeg" alt=""/>
                                        </div> */}
                    
                                        <div className="items">
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5eabc1e99b0beb3e04599717")}
                                                color="articles"
                                                // userSavedProducts={this.props.user_details.saved_products}
                                                isSaved={this.props.user_details?.saved_products?.find(o => o.product_id === '5eabc1e99b0beb3e04599717')}
                                            />
                    
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5eabc20a38584110a044f93e")}
                                                color="articles"
                                                // userSavedProducts={this.props.user_details.saved_products}
                                                isSaved={this.props.user_details?.saved_products?.find(o => o.product_id === '5eabc20a38584110a044f93e')}
                                            />
                                        </div>
                    
                                    </div>
                
                                    <div className="store-section">
                                        <h3>Tees</h3>
                    
                                        <div className="items">
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5eec730342888643d8f5e2ce")}
                                                color="articles"
                                            />
                    
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5f40753ab683383a945f7f7b")}
                                                color="articles"
                                            />
                                        </div>
                    
                                    </div>
            
                                    <div className="store-section">
                                        <h3>Accessories</h3>
                    
                                        <div className="items">
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5eb50fdde094562238f5b910")}
                                                color="articles"
                                            />
                    
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5f4c7014537b221bc419408d")}
                                                color="articles"
                                            />
                                        </div>
                    
                                    </div>
            
                                    <div className="store-section">
                                        <h3>Pins</h3>
                    
                                        <div className="items">
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5eb3aaaba316c3077c598cc4")}
                                                color="articles"
                                            />
                    
                                            <StoreItemBeta
                                                setPopOutVisible={this.setPopOut}
                                                product={this.state.products.find(element => element._id === "5f4b146d537b221bc419408c")}
                                                color="articles"
                                            />
                                        </div>
                    
                                    </div>
            
                                </div>
                            </div>
        
                        {/* Link Panels */}
                        <div className='container'>
        
                            {/* <div className='row justify-content-center'> */}
        
                            <div className="link-panels">
                                <Link href={ROUTES.STORE_PRODUCTS}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="panel card">
                                        <img src="https://cdn.articles.media/store/old_sheep_mockup_back.jpg" alt="" className="background view-all"/>
                                        <div className="icon">
                                            <i className="fas fa-tshirt"></i>
                                        </div>
                                        <div className="title">View All</div>
                                    </div>
                                </Link>
    
                                <Link href={ROUTES.STORE_COLLECTIONS}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="panel card">
                                        <img src="https://preview.free3d.com/img/2019/04/2154877840292579114/xqztcxft-900.jpg" alt="" className="background collections"/>
                                        <div className="icon">
                                            <i className="fas fa-grip-horizontal"></i>
                                        </div>
                                        <div className="title">Collections</div>
                                    </div>
                                </Link>
    
                                <Link href={ROUTES.STORE_SUBMISSIONS}>
                                    <div onClick={() => window.scrollTo(0, 0)} className="panel card">
    
                                        <div className="background submission"/>
    
                                        <div className="voting-board">
                                            <div className="board">
                                                {/* <i className="fas fa-ruler-combined"></i> */}
                                            </div>
                                            <div className="votes">
                                                <i className="fas fa-thumbs-down"></i>
                                                <i className="fas fa-thumbs-up mr-0"></i>
                                            </div>
                                        </div>
    
                                        <div className="icon">
                                            <i className="fas fa-lightbulb" aria-hidden="true"></i>
                                        </div>
    
                                        <div className="title">Submissions</div>
    
                                    </div>
                                </Link>
                                
                            </div>
        
                            {/* </div> */}
                        
                        </div>
        
                        {/* Type Guide */}
                        <div className="type-guide card">
        
                            <div className="extras-panels">
        
                                <div className="panel">
                                    <div className="type">Originals</div>
                                    <div className="description">Designed and sold by us!</div>
                                    <div className="progress">
                                        <div className="progress-bar original" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="profit">Net Profit: 100%</div>
                                </div>
        
                                <div className="panel">
                                    <div className="type partner">Partner</div>
                                    <div className="description">In collabaration with another creator or company.</div>
                                    <div className="progress">
                                        <div className="progress-bar partner" role="progressbar" style={{width: "30%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar progress-bar-striped progress-bar-animated partner" role="progressbar" style={{width: "40%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="profit">Net Profit: ~30%-70%</div>
                                </div>
        
                                <div className="panel">
                                    <div className="type sponsor">Sponsor</div>
                                    <div className="description">Promoted company/creator with a great cause.</div>
                                    <div className="progress">
                                        <div className="progress-bar sponsor" role="progressbar" style={{width: "2%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar progress-bar-striped progress-bar-animated sponsor" role="progressbar" style={{width: "5%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="profit">Net Profit: ~1-5%</div>
                                </div>
        
                                <div className="panel">
                                    <div className="type submission">Submission</div>
                                    <div className="description">User design that won the Submissions event.</div>
                                    <div className="progress">
                                        <div className="progress-bar submission" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="profit">Net Profit: 50%</div>
                                </div>
        
                            </div>
                            
                        </div>

                    </div>
                    {/* )}/> */}
    
                </section>
          )
      }
  }

function Home() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Store - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Store Home Page</h2>
                <p>This is the products page with the StoreLayout set.</p>
            </div>
        </section>
    )
}

StorePage.Layout = StoreLayout;
export default StorePage;