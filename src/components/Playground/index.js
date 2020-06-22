import React from 'react';
import moment from 'moment'

class Outset extends React.Component {
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
    };

  }

  componentDidMount() {
    const fakeSubmissions = [

    ]

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

    return (
      <div className="playground-page">
        <div className="container mt-5 mb-5">
  
          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <h4>Heading Four</h4>
          <h5>Heading Five</h5>

          <p>This is an example of a text block on the page.</p>

          <button className="btn btn-articles-light mr-2">Articles Light</button>
          <button className="btn btn-articles-light alt">Articles Light Alt</button>

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

export default Outset