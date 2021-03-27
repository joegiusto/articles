<Switch>

<Route exact path={[ROUTES.STORE, ROUTES.STORE_VIEW]} render={() => (
    <div>
        <div className="hero">

            <img src={ (this.props.colorModeDark ? heroDark : hero) } alt=""/>

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

        <div className='container'>

            {/* <div className='row justify-content-center'> */}

            <div className="link-panels">
                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_PRODUCTS}>
                    <div className="panel">
                        <img src="https://cdn.articles.media/store/old_sheep_mockup_back.jpg" alt="" className="background view-all"/>
                        <div className="icon">
                            <i className="fas fa-tshirt"></i>
                        </div>
                        <div className="title">View All</div>
                    </div>
                </Link>

                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_COLLECTIONS}>
                    <div className="panel">
                        <img src="https://preview.free3d.com/img/2019/04/2154877840292579114/xqztcxft-900.jpg" alt="" className="background collections"/>
                        <div className="icon">
                            <i className="fas fa-grip-horizontal"></i>
                        </div>
                        <div className="title">Collections</div>
                    </div>
                </Link>

                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_SUBMISSIONS}>
                    <div className="panel">

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

        <div className="type-guide">

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
)}/>

<Route exact path={ROUTES.STORE_PRODUCTS} render={() => (
    <div className="container">
        <div className="store-products-page">

            {this.state.products.filter((o) => o.type === 'Original').map((product) => (
                product.visible === true ?
                <StoreItemBeta
                    setPopOutVisible={this.setPopOut}
                    product={product}
                    color="articles"
                />
                :
                null
            ))}

            {this.state.products.filter((o) => o.type === 'Partnership').map((product) => (
                product.visible === true ?
                <StoreItemBeta
                    setPopOutVisible={this.setPopOut}
                    product={product}
                    color="articles"
                />
                :
                null
            ))}

            {this.state.products.filter((o) => o.type === 'Sponsored').map((product) => (
                product.visible === true ?
                <StoreItemBeta
                    setPopOutVisible={this.setPopOut}
                    product={product}
                    color="articles"
                />
                :
                null
            ))}
            
        </div>
    </div>
)}/>

<Route exact path={ROUTES.STORE_COLLECTIONS} render={() => <CollectionsPage/>}/>

<Route exact path={ROUTES.STORE_ORDERS} render={() => <OrdersPage/>}/>

<Route exact path={ROUTES.STORE_SAVED} render={() => <SavedPage/> }/>

<Route exact path={ROUTES.CHECKOUT} render={() => <CheckoutPage/>}/>

<Route exact path={ROUTES.STORE_SUBMISSIONS} render={() => <Submissions/>}/>

<Route exact path={ROUTES.STORE_SUBMISSIONS_SUBMIT} render={() => <Submissions/>}/>

</Switch>