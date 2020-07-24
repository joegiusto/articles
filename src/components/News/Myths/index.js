import React, { useState } from 'react';
import { connect } from "react-redux";

import IssueCard from './components/MythCard';

function Myths(props) {
  const [search, changeSearch] = useState("");

  return (
 <section className="myths-section">
    {/* <div className='container'> */}
  
      <div className="myths-head ">
        <h1 className="title">Myths</h1>
        <p className="body">You ever hear someone say windmills cause cancer? Maybe, you had someone tell you that electric cars actually have a larger carbon footprint then gasoline and diesel vehicles. Explore the many topics of common confusion here.</p>

        <div className="filters noselect">

            <span className="subscription-badges">
              <span className="bold"><i class="fas fa-calendar"></i></span>
              <div className={"badge border badge-light"}>Posted</div>
              <div className={"ml-1 badge border badge-light"}>Updated</div>
            </span>

          </div>
      </div>
  
      {/* <p>Myths - example - See reddit saved post, "<a href="https://www.reddit.com/r/technology/comments/bj2h83/enough_with_the_actually_electric_cars_pollute/">Actually Electric Cars Pollute More</a>" Take the top common myths in this country at the moment and debunk them. Everything from electric cars to global warming and just explain them in a deteiled fact based/source-cited way that eveyone can easily reference and understand.</p> */}
  
      <div className="row mt-4">
      
        <div className="col-12">

          <div className="filter-box d-none">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
              </div>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Begin typing to search titles and topics" 
                value={search} aria-label="Username" 
                aria-describedby="basic-addon1"
                onChange={(event) => changeSearch(event.target.value)}
              />
            </div>
    
            <div className="filters d-flex justify-content-between">

              {/* TODO Get this is, site up first! */}
              {/* <div className="sort-controls"></div> */}

              <div className="hint-badges">
                <span onClick={() => changeSearch("Global Warming")} className="badge badge-pill badge-warning myth-topic">Global Warming</span>
                <span onClick={() => changeSearch("Electric Cars")} className="badge badge-pill badge-info myth-topic">Electric Cars</span>
                <span onClick={() => changeSearch("Vaccinations")} className="badge badge-pill badge-danger myth-topic">Vaccinations</span>
                <span onClick={() => changeSearch("Green Energy")} className="badge badge-pill badge-success myth-topic">Green Energy</span>
                <span onClick={() => changeSearch("Police")} className="badge badge-pill badge-primary myth-topic">Police</span>
                <span onClick={() => changeSearch("Health")} className="badge badge-pill border btn-outline-dark alert-primary myth-topic">Health</span>
              </div>
            </div>
           

          </div>
  
        </div>
  
        {props.myths.myths ?
        (props.myths.myths.map((myth, i) => (
          <IssueCard key={i} index={i} length={props.myths.myths.length} myth={myth}/>
        )))
        : 
        <div>Myths Loading</div>
        }
  
      </div>
  
      <div className="myths-footer mb-3 d-none">
        <h1 className="title">Liked that?</h1>
        <p className="body">Ask more questions with our partner <a href="https://www.answers.com">Answers.com</a></p>
        <input type="text"/>
        <p className="text-muted">This is not actually a thing yet but something like this would be cool, partnering with other sites to drive views to them and to encourage people to keep asing questions.</p>
      </div>
  
    {/* </div> */}
 </section>
  );
}

const mapStateToProps = state => ({
  myths: state.myths,
});

export default connect(
  mapStateToProps
)(Myths);