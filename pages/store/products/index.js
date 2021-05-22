import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { connect } from "react-redux";

import StoreLayout from 'components/layouts/store.js';
import StoreItemBeta from 'components/store/StoreItem';

class Products extends Component {
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
                    <title>Products - Articles</title>
                </Head>

                <div className="container">

                    <div className="store-products-page">

                        {this.state.loadingProducts && <div>Loading</div>}

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
            </section>
        )
    }
}

Products.Layout = StoreLayout;
export default Products;