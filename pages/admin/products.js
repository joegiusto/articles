import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'

import DataTable from 'react-data-table-component';

// Articles Imports
import AdminLayout from 'components/layouts/admin.js';
import StoreItemBeta from 'components/store/StoreItem';
import ConfirmDelete from 'components/ConfirmDelete';

const inital_state = {
    title: '',
    type: '',
    price: 0,
    ourCost: 0,
    material: '',
    visible: true,
    includesSubscription: false,
    subscriptionTime: 0,
    photos: {
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: ''
    },
  }
  
class Products extends Component {
    constructor(props) {
    super(props);
    
      this.state = {
        products: [],
  
        currentProduct: '',
  
        view: 'details',
  
        activeProduct: {
          ...inital_state
        },
  
        activeProductLoading: false,
        activeProductError: false
      };
  
      this.handleProductChange = this.handleProductChange.bind(this);
      this.handleProductPhotoChange = this.handleProductPhotoChange.bind(this);
    }
  
    componentDidMount() {
    //   this.props.setLocation(this.props.tabLocation);
      const self = this;
  
      axios.get('/api/products')
      .then(function (response) {
  
        console.log(response);
  
        self.setState({ 
          products: response.data,
        });
  
      })
      .catch(function (error) {
        console.log(error);
  
        self.setState({
          products: [],
        })
      });
    }
    
    componentDidUpdate(prevProps, prevState) {
      const self = this;
  
      if (prevState.currentProduct !== this.state.currentProduct) {
        // console.log("activeProduct Changed!")
        self.setState({
          activeProductLoading: true
        })
        
        axios.post('/api/products', {
          product_id: this.state.currentProduct
        })
        .then(function (response) {
          // response.data.visible = (response.data.visible === 'true' ? true : false)
  
          self.setState({ 
            activeProduct: response.data,
            activeProductLoading: false,
            activeProductError: false
          });
  
        })
        .catch(function (error) {
          console.log(error);
  
          self.setState({
            activeProduct: {},
            activeProductLoading: false,
            activeProductError: true
          })
        });
  
      }
    }
  
    componentWillUnmount() {
    //   this.props.setLocation('');
    }
  
    renderType(type) {
      switch(type) {
        case 'Original':
          return (
            <div className="badge badge-dark">Original</div>
          )
        case 'Partnership':
          return (
            <div className="badge badge-primary">Partnership</div>
          )
        case 'Sponsored':
          return (
            <div className="badge badge-warning">Sponsored</div>
          )
        default:
          return (
            <div className="badge badge-alert">Error</div>
          )
      }
    }
  
    renderPhotos(productPhotos) {
      return(
        <div className="has-photo">
          <span className={"photo" + (productPhotos.one === "" ? "" : " link")}></span>
          <span className={"photo" + (productPhotos.two === "" ? "" : " link")}></span>
          <span className={"photo" + (productPhotos.three === "" ? "" : " link")}></span>
          <span className={"photo" + (productPhotos.four === "" ? "" : " link")}></span>
          <span className={"photo" + (productPhotos.five === "" ? "" : " link")}></span>
          <span className={"photo" + (productPhotos.six === "" ? "" : " link")}></span>
        </div>
      )
    }
  
    changeType(type) {
      this.setState({
        activeProduct: {
          ...this.state.activeProduct,
          type: type
        }
      })
    }
  
    handleProductChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        ...this.state,
        activeProduct: {
          ...this.state.activeProduct,
          [name]: value
        }
      });
    }
  
    handleProductPhotoChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        ...this.state,
        activeProduct: {
          ...this.state.activeProduct,
          photos: {
            ...this.state.activeProduct.photos,
            [name]: value
          }
        }
      });
    }
  
    removeProduct(id) {
      const self = this;
  
      axios.post('/api/deleteProduct', {
        _id: id 
      })
      .then(function (response) {
  
        // socket.emit('deleteUser', id);
  
        self.setState({
          products: self.state.products.filter(function( obj ) {
            return obj._id !== id;
          })
        });
  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    onSubmit() {
      console.log('onSubmit called!')
      const self = this;
  
      axios.post('/api/upsertProduct', {
        product: this.state.activeProduct
      })
      .then(function (response) {
  
        self.setState({
          currentProduct: '',
  
          activeProduct: inital_state,
          activeProductLoading: false,
          activeProductError: false
        });
  
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render() {
        const columns = [
            {
            name: 'Item',
            selector: 'title',
            sortable: true,
            },
            {
            name: 'Type',
            selector: 'type',
            sortable: true,
            cell: row => this.renderType(row.type)
            },
            {
            name: 'Visible',
            selector: 'visible',
            sortable: true,
            cell: row => <div>{(row.visible ? 
            <div className="badge badge-success">True</div>
            :
            <div className="badge badge-danger">False</div>
            )}</div>,
            },
            {
            name: 'Subscription Bundle',
            selector: 'includesSubscription',
            sortable: true,
            cell: row => <div>{(row.includesSubscription ? 
            <div className="badge badge-success">True ({row.subscriptionTime})</div>
            :
            <div className="badge badge-danger">False</div>
            )}</div>,
            },
            {
            name: 'Price',
            selector: 'price',
            sortable: true,
            cell: row => '$' + (row.price / 100).toFixed(2)
            },
            {
            name: 'Card Photos',
            cell: row => <div>{this.renderPhotos(row.photos)}</div>,
            },
            {
            name: 'Actions',
            cell: row => 
            <>
                <div style={{cursor: "pointer"}} className="badge badge-articles mr-2" onClick={() => this.setState({currentProduct: row._id})}>Edit</div>
                <ConfirmDelete afterConfirm={() => this.removeProduct(row._id)}></ConfirmDelete>
            </>
            },
        ];
  
        const customStyles = {
            rows: {
            style: {
                fontSize: '16px', // override the row height
            }
            },
            headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontWeight: 'bold',
            },
            },
            cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                borderRight: '1px solid #dee2e6'
            },
            },
        };
  
        return (
            <div className="admin-page admin-products">

                <Head>
                    <title>Admin Products - Articles</title>
                </Head>
    
                <div className="side-panel">
        
                    <div className="card">
                        <div className="card-header">Originals</div>
                        <div className="card-body">
                            <div><b>Total: 8</b></div>
                            <hr/>
                            <div><b>Hoodie: 2</b></div>
                            <div><b>Pins: 2</b></div>
                            <div><b>Shirts: 2</b></div>
                            <div><b>Hats: 1</b></div>
                            <div><b>Other: 1</b></div>
                        </div>
                    </div>
        
                    <div className="card mt-3">
                        <div className="card-header">Partnerships</div>
                        <div className="card-body">
                            <div><b>Total: 2</b></div>
                        </div>
                    </div>
        
                    <div className="card mt-3">
                        <div className="card-header">Sponsored</div>
                        <div className="card-body">
                            <div><b>Total: 1</b></div>
                        </div>
                    </div>
        
                    <div className="card mt-3">
                        <div className="card-header">Submissions</div>
                        <div className="card-body">
                            <div><b>Total: 0</b></div>
                        </div>
                    </div>
        
                </div>
        
                <div className="main-panel">
        
                    {/* OLD MANAGE */}
                    <div className="product-manage d-none">
            
                        <div className="preview d-flex justify-content-center align-items-center store-page pt-4">
                
                            {/* <StoreItemAlpha 
                            setPopOutVisible={this.setPopOut} 
                            catalogId='1' 
                            price={this.state.activeProduct.price}
                            ourCost={this.state.activeProduct.ourCost}
                            title={this.state.activeProduct.title} 
                            material={this.state.activeProduct.material}
                            sale="%15" 
                            banner={this.state.activeProduct.type} 
                            color="articles" 
                            /> */}
                
                            <StoreItemBeta product={this.state.activeProduct} color="articles" />
                
                        </div>
                
                        <div className="details">
                
                            <div className="color-bar"></div>
                
                            {
                            this.state.currentProduct === '' ? 
                            '' 
                            : 
                            <div className="d-flex justify-content-between connection-details">
                            <div className="badge badge-dark mb-3">{this.state.currentProduct}</div>
                
                            {/*  */}
                            {this.state.activeProductLoading ? 
                            <div className="badge badge-warning mb-3">Loading</div>
                            :
                            this.state.activeProductError ? 
                            <div className="badge badge-danger mb-3">Error</div>
                            :
                            <div className="badge badge-success mb-3">Success</div>
                            }
                            </div>
                            }
                
                            {/* This will be for mobile to toggle between details and card to save screen space */}
                            {/* <div className="btn-group w-100 mb-3" role="group" aria-label="First group">
                            <button type="button" className="btn btn-dark">Details</button>
                            <button type="button" className="btn btn-light border">Preview</button>
                            </div> */}
                
                            <div className="form-group type-group">
                
                            {/* <label htmlFor="exampleInputPassword1">Type</label> */}
                
                            <div className="types noselect">
                                <span onClick={() => this.changeType('Original')} className={"type badge shadow-sm border type " + (this.state.activeProduct.type === 'Original' ? 'badge-dark' : 'badge-light')}>Original</span>
                                <span onClick={() => this.changeType('Partnership')} className={"type badge shadow-sm border type " + (this.state.activeProduct.type === 'Partnership' ? 'badge-primary' : 'badge-light')}>Partnership</span>
                                <span onClick={() => this.changeType('Sponsored')} className={"type badge shadow-sm border type " + (this.state.activeProduct.type === 'Sponsored' ? 'badge-warning' : 'badge-light')}>Sponsored</span>
                            </div>
                            </div>
                
                            <div className="row">
                
                            <div className="col-md-6">
                
                                <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={this.state.activeProduct.title}
                                    onChange={this.handleProductChange}
                                    id="title"
                                    name="title"
                                />
                                </div>
                    
                                <div className="form-group">
                                <label htmlFor="price">Price ${(this.state.activeProduct.price / 100).toFixed(2)}</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    value={this.state.activeProduct.price} 
                                    onChange={this.handleProductChange}
                                    id="price"
                                    name="price"
                                />
                                </div>
                    
                                <div className="form-group">
                                <label htmlFor="our-cost">Our Cost ${(this.state.activeProduct.ourCost / 100).toFixed(2)}</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                value={this.state.activeProduct.ourCost}
                                onChange={this.handleProductChange} 
                                id="ourCost"
                                name="ourCost"
                                />
                                </div>
                
                                <div className="form-group">
                                <label htmlFor="our-cost">Material</label>
                                <input
                                type="text"
                                className="form-control"
                                value={this.state.activeProduct.material}
                                onChange={this.handleProductChange} 
                                id="material"
                                name="material"
                                />
                                </div>
                
                            </div>
                
                            <div className="col-md-6">
                                
                                <div className="photos">
                                <div className="pb-2">Showcase Photos</div>
                
                                <div className="photo">
                                    <span className="number">1</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.one}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="one"
                                    name="one"
                                    />
                                </div>
                
                                <div className="photo">
                                    <span className="number">2</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.two}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="two"
                                    name="two"
                                    />
                                </div>
                
                                <div className="photo">
                                    <span className="number">3</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.three}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="three"
                                    name="three"
                                    />
                                </div>
                
                                <div className="photo">
                                    <span className="number">4</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.four}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="four"
                                    name="four"
                                    />
                                </div>
                
                                <div className="photo">
                                    <span className="number">5</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.five}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="five"
                                    name="five"
                                    />
                                </div>
                
                                <div className="photo">
                                    <span className="number">6</span>
                                    <input
                                    type="text"
                                    value={this.state.activeProduct.photos?.six}
                                    onChange={this.handleProductPhotoChange}
                                    className="form-control"
                                    id="six"
                                    name="six"
                                    />
                                </div>
                
                                </div>
                
                                <div className="mt-2">Visible</div>
                
                                <div onClick={() => (this.setState({
                                activeProduct: {
                                    ...this.state.activeProduct,
                                    visible: true
                                }
                                }))} className={"badge " + (this.state.activeProduct.visible ? 'badge-dark' : 'badge-light')}>Yes</div>
                
                                <div onClick={() => (this.setState({
                                activeProduct: {
                                    ...this.state.activeProduct,
                                    visible: false
                                }
                                }))} className={"badge " + (!this.state.activeProduct.visible ? 'badge-dark' : 'badge-light')}>No</div>
                
                                <div className="mt-2">Includes Subscription</div>
                
                                <div onClick={() => (this.setState({
                                activeProduct: {
                                    ...this.state.activeProduct,
                                    includesSubscription: true
                                }
                                }))} className={"badge " + (this.state.activeProduct.includesSubscription ? 'badge-dark' : 'badge-light')}>Yes</div>
                
                                <div onClick={() => (this.setState({
                                activeProduct: {
                                    ...this.state.activeProduct,
                                    includesSubscription: false
                                }
                                }))} className={"badge " + (!this.state.activeProduct.includesSubscription ? 'badge-dark' : 'badge-light')}>No</div>
                
                                {this.state.activeProduct.includesSubscription ? 
                                <div className="form-group">
                                <label htmlFor="our-cost">Subscription Time (Months)</label>
                                <input
                                type="number"
                                className="form-control"
                                value={this.state.activeProduct.subscriptionTime}
                                onChange={this.handleProductChange} 
                                id="subscriptionTime"
                                name="subscriptionTime"
                                />
                                </div>
                                :
                                null
                                }
                
                            </div>
                
                            </div>
                
                            {this.state.currentProduct === '' ? 
                            <div onClick={() => this.onSubmit()} className="btn upsert btn-articles-light">Add Product</div>
                            :
                            this.state.activeProductError ?
                            <div className="btn upsert btn-articles-light disabled" style={{cursor: 'not-allowed'}}>Update Product</div>
                            :
                            <div onClick={() => this.onSubmit()} className="btn upsert btn-articles-light">Update Product</div>
                            }
                            
                        </div>
                
                    </div>
            
                    <div className="card manage-card">
        
                        <div className="card-header">
        
                            {/* <h1>Products List</h1> */}
        
                            <div className="d-flex align-items-center">
                                <i className="fas fa-edit fa-2x"></i>
                                <h3 className="mb-0">Manage Products</h3>
                                <div className="total">({this.state.products.length})</div>
                            </div>
        
                            <button onClick={() => /* setModalShow(true) */ null} className="btn btn-articles-light btn-sm">Add Product</button>
                        </div>
        
                        <div className="card-body">
                            <DataTable
                                title="Does not matter"
                                noHeader={true}
                                highlightOnHover={true}
                                columns={columns}
                                data={this.state.products}
                                customStyles={customStyles}
                                className='table table-sm mb-0'
                                // expandableRows={true}
                                // expandOnRowClicked={true}
                                // expandableRowsComponent={
                                //   <div>Testing</div>
                                // }
                            />
                        </div>
        
                    </div>
        
                </div>
        
            </div>
        );
    }
}

Products.Layout = AdminLayout;
export default Products;