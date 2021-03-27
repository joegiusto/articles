<div className={"pop-out-viewer-container " + (this.props.match.params.id ? ' active' : '')}>

    <Link to={ROUTES.STORE} onClick={() => this.setPopOut(false)}>
        <div className="background"></div>
    </Link>

    <div className="pop-out-viewer">
        <div className={"viewer-nav "} style={{backgroundColor: this.state.currentPopOut.tabColor || "ffb7b7"}}>
            <Link to={ROUTES.STORE}><div onClick={() => this.setPopOut(false)} className="close-button"></div></Link>
        </div>
        <div className="viewer-body">
            <div className="row justify-content-between">

                <div className="col-12 col-md-8">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="selected-photo">
                                <img src={this.state.currentPopOutPhoto} alt=""/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <h5>Showcase Photos</h5>
                            <div className="thumbnails">
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.one})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.one} alt=""/>
                                </div>
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.two})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.two} alt=""/>
                                </div>
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.three})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.three} alt=""/>
                                </div>
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.four})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.four} alt=""/>
                                </div>
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.five})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.five} alt=""/>
                                </div>
                                <div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.six})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
                                    <img src={this.state.currentPopOut.photos?.six} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4 border-left">

                    <div className="detail-container">			
                                            
                        <h1>{this.state.currentPopOut.title}</h1>
                        <div>Realesed | {this.state.currentPopOut.realese || <div className="badge badge-dark">?</div>}</div>
                        <div>Material | {this.state.currentPopOut.material}</div>
                        <div>Price | ${(this.state.currentPopOut.price / 100).toFixed(2)}</div>

                        <button className="btn btn-articles-light mt-2">Add to Cart</button>	
                    </div>

                </div>

            </div>
        </div>

        <div className="viewer-footer">
            <img src={this.state.currentPopOut.backing} alt=""/>
        </div>

    </div>

</div>
