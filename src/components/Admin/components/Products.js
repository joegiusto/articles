import React, {Component} from 'react'
import axios from 'axios'
import StoreItem from '../../Store/StoreItemAlpha'

const inital_state = {
  title: '',
  type: '',
  price: 0,
  ourCost: 0,
  material: '',
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
    this.props.setLoaction(this.props.tabLocation);
    const self = this;

    axios.get('/getProducts')
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
      
      axios.post('/getProduct', {
        product_id: this.state.currentProduct
      })
      .then(function (response) {

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
    this.props.setLoaction('');
  }

  renderType(type) {
    switch(type) {
      case 'original':
        return (
          <div className="badge badge-dark">Original</div>
        )
      case 'partnership':
        return (
          <div className="badge badge-dark">Original</div>
        )
      case 'sponsered':
        return (
          <div className="badge badge-dark">Original</div>
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

  onSubmit() {
    console.log('onSubmit called!')
    const self = this;

    axios.post('/upsertProduct', {
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

    return (
      <div className="mt-5 admin-products">

        <div className="">
          <h5>Product Info</h5>
        </div>

        <table class="table table-bordered bg-white">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Card Photos</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {this.state.products.map(product => (

              <tr>
                <th scope="row">{product.title}</th>
                <td>{this.renderType(product.type)}</td>
                <td>${product.price / 100}</td>
                <td>{this.renderPhotos(product.photos)}</td>
                <td><div className="badge badge-articles mr-2" onClick={() => this.setState({currentProduct: product._id})}>Edit</div><div className="badge badge-danger">Delete</div></td>
              </tr>
              
            ))}

          </tbody>
        </table>

        <hr/>

        <div className="product-manage">

          <div className="preview d-flex justify-content-center align-items-center store-page pt-4">
            <StoreItem setPopOutVisible={this.setPopOut} catalogId='1' price={this.state.activeProduct.price} title={this.state.activeProduct.title} sale="%15" banner={this.state.activeProduct.type} color="articles" />
          </div>

          <div className="details">

            {
            this.state.currentProduct === '' ? 
            '' 
            : 
            <div className="d-flex justify-content-between">
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

            <div class="btn-group w-100 mb-3" role="group" aria-label="First group">
              <button type="button" class="btn btn-dark">Details</button>
              <button type="button" class="btn btn-light border">Preview</button>
            </div>

            <div class="form-group">
              <label for="title">Title</label>
              <input 
                type="text"
                className="form-control"
                value={this.state.activeProduct.title}
                onChange={this.handleProductChange}
                id="title"
                name="title"
              />
            </div>
  
            <div class="form-group">
              <label for="exampleInputPassword1">Type</label>
              <div className="types">
                <span onClick={() => this.changeType('Original')} className={"badge shadow-sm border type " + (this.state.activeProduct.type === 'Original' ? 'badge-dark' : 'badge-light')}>Original</span>
                <span onClick={() => this.changeType('Sponsered')} className={"badge shadow-sm border type " + (this.state.activeProduct.type === 'Sponsered' ? 'badge-dark' : 'badge-light')}>Sponsered</span>
                <span onClick={() => this.changeType('Partnership')} className={"badge shadow-sm border type " + (this.state.activeProduct.type === 'Partnership' ? 'badge-dark' : 'badge-light')}>Partnership</span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="price">Price ${(this.state.activeProduct.price / 100).toFixed(2)}</label>
              <input 
                type="number"
                className="form-control"
                value={this.state.activeProduct.price} 
                onChange={this.handleProductChange}
                id="price"
                name="price"
              />
            </div>
  
            <div class="form-group">
              <label for="our-cost">Our Cost ${(this.state.activeProduct.ourCost / 100).toFixed(2)}</label>
              <input 
              type="number" 
              class="form-control" 
              value={this.state.activeProduct.ourCost}
              onChange={this.handleProductChange} 
              id="ourCost"
              name="ourCost"
              />
            </div>
  
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
  
            <div class="form-group">
              <label for="our-cost">Material</label>
              <input
              type="text"
              className="form-control"
              value={this.state.activeProduct.material}
              onChange={this.handleProductChange} 
              id="material"
              name="material"
              />
            </div>

            {this.state.currentProduct === '' ? 
            <div onClick={() => this.onSubmit()} className="btn btn-articles-light">Add Product</div>
            :
            this.state.activeProductError ?
            <div className="btn btn-articles-light disabled" style={{cursor: 'not-allowed'}}>Update Product</div>
            :
            <div onClick={() => this.onSubmit()} className="btn btn-articles-light">Update Product</div>
            }
            

          </div>

        </div>

      </div>
    );
  }
}

export default Products