import React from 'react';
import GoogleMapReact from 'google-map-react';
import moment from 'moment'
import axios from 'axios'

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'white',
    // padding: '5px 5px',
    border: '5px solid #fff',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#ffc8c8',
    borderTopColor: '#ffc8c8',
    borderBottomColor: '#F5F5DC',
    borderRightColor: '#F5F5DC',
    // borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 1px 3px rgba(0, 0, 0, 0.5)'
    // borderRadius: '10px'
  }}>
    <img src="https://www.logodesignlove.com/images/monograms/tesla-symbol.jpg" height="30px" alt=""/>
    <span>{text}</span>
  </div>
);

class SimpleMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0,
      
      places: [
        {
          text: 'Tesla',
          lat: 37.090240, 
          lng: -95.712891 
        },
        {
          text: 'Protest',
          lat: 37.090240, 
          lng: -95.712891 
        }
      ]
    }
  }

  static defaultProps = {
    center: {lat: 37.09, lng: -95.71},
    zoom: 5
    ,
    // bootstrapURLKeys: { key: '565403139080-i42ucf0miotmvqobitbsd35f92pek539.apps.googleusercontent.com' }
  };

  render() {
    return (
      <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68' }}
      defaultCenter={this.props.center}
      defaultZoom={this.props.zoom}
    >
      <AnyReactComponent 
        lat={37.090240} 
        lng={-95.712891} 
        text={'Tesla'} 
      />

      <AnyReactComponent 
        lat={this.props.lat} 
        lng={this.props.lng} 
        text={'Tesla'} 
      />

    </GoogleMapReact>
    );
  }
}

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: (a, b) => b.total - a.total,
      sortType: 'top',
      submissions: [
        {
          up: 98,
          down: 102,
          date: new Date('May 1 2020')
        },
        {
          up: 13,
          down: 62,
          date: new Date('May 23 2020')
        },
        {
          up: 11,
          down: 9,
          date: new Date('May 2 2020')
        },
        {
          up: 55,
          down: 49,
          date: new Date('May 19 2020')
        },
        {
          up: 100,
          down: 100,
          date: new Date('May 19 2020')
        },
        {
          up: 255,
          down: 104,
          date: new Date('May 19 2020')
        },
        {
          up: 16,
          down: 21,
          date: new Date('May 3 2020')
        },
        {
          up: 85,
          down: 61,
          date: new Date('May 30 2020')
        },
        {
          up: 500,
          down: 400,
          date: new Date('May 29 2020')
        },
        {
          up: 1000,
          down: 988,
          date: new Date('May 28 2020')
        },
        {
          up: 500,
          down: 40,
          date: new Date('May 12 2020')
        }
      ],
      news: [],
      newsType: 'all'
    };

  }

  componentDidMount() {
    const self = this
    const fakeSubmissions = [

    ]

    // if ("geolocation" in navigator) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }

    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        self.setState({
          lat : position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );

    this.state.submissions.map((object, i) => {

      const total = object.up + object.down;

      fakeSubmissions[i] = object;

      fakeSubmissions[i].total = total
      fakeSubmissions[i].prescore = object.total / ( Math.min(object.up, object.down) / Math.max(object.up, object.down) )
      fakeSubmissions[i].controversial = object.total / object.prescore > 0.7
      

      this.setState({
        submissions: fakeSubmissions
      })

    })

    axios.get('/api/getNews')
    .then(function (response) {

      self.setState({
				news: response.data.news,
				// loadingProducts: false
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
		});
  }

  componentDidUpdate(prevProps, prevState) {
    const self = this;

    if (prevState.sortType !== this.state.sortType) {
      
      console.log("Sort Type Changed")

    }
  }

  render() {

    console.log(this.state.sortType)

    const sortedSubmissions = [].concat(this.state.submissions)

      .filter((item) => this.state.sortType === 'controversial' ? (item.controversial !== false ? item : null) : item )

      .sort( this.state.sort )
      
      .map((object, i) => 
        // <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
        <div key={i} style={{border: '2px solid #000'}} className="mt-2 p-2">

          <div>{`Date: `}<span className="badge badge-dark">{moment(object.date).format("LLL")}</span></div>

          <div>{`Total Votes: `}<span className="badge badge-dark">{object.total}</span></div>

          <div>Down: <span className="badge badge-danger">{object.down}</span></div>
          <div className="pr-2">Up: <span className="badge badge-primary">{object.up}</span></div>
          
          <div>Pre Score: {object.prescore}</div>
          <div>Final Score: {object.total / object.prescore }</div>

          { object.controversial && this.state.sortType === "controversial" ? 
          <div className="badge badge-warning">Controversial</div>
          :
          null
          }

        </div>
    );

    const sortedNews = [].concat(this.state.news)

      .filter((item) => this.state.newsType === 'all' ? item : (item.news_type === this.state.newsType ? item : null ) )

      // .filter((item) => item.news_type === this.state.newsType ? item : null )

      // .sort( this.state.sort )
      
      .map((object, i) => 
        // <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
        <div key={object._id} style={{border: '2px solid #000'}} className="mt-2 p-2">

          <div className="d-flex justify-content-between">
            <div className="title">{object.news_title}</div>
            <div className="tags">{object.news_tags.length > 0 ? object.news_tags.map((tag) => <span className="badge badge-articles mr-1">{tag.tag_name}</span>) : 'None'}</div>
          </div>


        </div>
    );

    return (
      <div className="playground-page">
        <div className="container mt-5 mb-5">

          <div style={{width: '100%', height: '400px'}}>
            <SimpleMap lat={this.state.lat} lng={this.state.lng}/>
          </div>
  
          <div className="type mt-5">
            <h1>Heading One</h1>
            <h2>Heading Two</h2>
            <h3>Heading Three</h3>
            <h4>Heading Four</h4>
            <h5>Heading Five</h5>
  
            <p>This is an example of a text block on the page.</p>
  
            <button className="btn btn-articles-light mr-2">Articles Light</button>
            <button className="btn btn-articles-light alt">Articles Light Alt</button>
          </div>

          <div className="news mt-5">
            {/* {this.state.news.map((document) => (
              <div>{document.news_title} - {document.news_type}</div>
            ))} */}
            <div onClick={() => {
              this.setState({
                newsType: 'all',
                // sort: (a, b) => b.total - a.total
              })
              }} className={"badge " + (this.state.newsType === "all" ? 'badge-dark' : '')}>All</div>
            
            <div onClick={() => {
              this.setState({
                newsType: 'story',
                // sort: (a, b) => b.total - a.total
              })
              }} className={"badge " + (this.state.newsType === "story" ? 'badge-dark' : '')}>Stories</div>

            <div onClick={() => {
              this.setState({
                newsType: 'issue',
                // sort: (a, b) => b.total - a.total
              })
              }} className={"badge " + (this.state.newsType === "issue" ? 'badge-dark' : '')}>Issues</div>

            <div onClick={() => {
              this.setState({
                newsType: 'myth',
                // sort: (a, b) => b.total - a.total
              })
              }} className={"badge " + (this.state.newsType === "myth" ? 'badge-dark' : '')}>Myths</div>

            {sortedNews}

          </div>

          <div className="sorts mt-5">

            <div onClick={() => {
              this.setState({
                sortType: 'top',
                sort: (a, b) => b.total - a.total
              })
              }} className={"badge " + (this.state.sortType === "top" ? 'badge-dark' : '')}>Top</div>

            <div onClick={() => {
              this.setState({
                sortType: 'new',
                sort: (a, b) => b.date - a.date
              })
            }} className={"badge " + (this.state.sortType === "new" ? 'badge-dark' : '')}>New</div>

            <div onClick={() => {
              this.setState({
                sortType: 'controversial',
                sort: (a, b) => b.prescore - a.prescore
              })
            }} className={"badge " + (this.state.sortType === "controversial" ? 'badge-dark' : '')}>Controversial</div>

          </div>

          {sortedSubmissions}
  
        </div>
      </div>
    )
  }
}

export default Playground