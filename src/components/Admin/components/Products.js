import React, {Component} from 'react'
import axios from 'axios'

class Products extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      products: [],
    };

  }

  componentDidMount() {
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
        {productPhotos.map((photo) => (
          <span className={"photo" + (photo === "" ? "" : "link")}></span>
        ))}
      </div>
    )
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
                <td><div className="badge badge-articles mr-2">Edit</div><div className="badge badge-danger">Delete</div></td>
              </tr>
              
            ))}

          </tbody>
        </table>

        <hr/>

        <div className="product-manage">

          <div className="preview">

          </div>

          <div className="details">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title"/>
            </div>
  
            <div class="form-group">
              <label for="exampleInputPassword1">Type</label>
              <div className="types">
                <span className="badge badge-light shadow-sm border type">Original</span>
                <span className="badge badge-light shadow-sm border type">Sponsered</span>
                <span className="badge badge-light shadow-sm border type">Partnership</span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="price">Price</label>
              <input type="number" class="form-control" id="price"/>
            </div>
  
            <div class="form-group">
              <label for="our-cost">Our Cost</label>
              <input type="number" class="form-control" id="our-cost"/>
            </div>
  
            <div className="photos">
              <div className="pb-2">Showcase Photos</div>
              <div className="photo">
                <span className="number">1</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
              <div className="photo">
                <span className="number">2</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
              <div className="photo">
                <span className="number">3</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
              <div className="photo">
                <span className="number">4</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
              <div className="photo">
                <span className="number">5</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
              <div className="photo">
                <span className="number">6</span>
                <input type="text" class="form-control" id="our-cost"/>
              </div>
            </div>
  
            <div class="form-group">
              <label for="our-cost">Material</label>
              <input type="text" class="form-control" id="our-cost"/>
            </div>

            <div className="btn btn-articles-light">Add Product</div>

          </div>

        </div>

      </div>
    );
  }
}

export default Products