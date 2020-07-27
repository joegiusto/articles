import React, { useState } from 'react';
import { connect } from "react-redux";

import StoryCard from './components/StoryCard';
import { NewsCard } from '../index'

function Myths(props) {
  const [search, changeSearch] = useState("");

  return (
 <section className="myths-section">
    {/* <div className='container'> */}
  
      {/* <div className="myths-head">
        <h1 className="title">Stories</h1>
        <p className="body">Stories from around the country.</p>
      </div> */}
  
      {/* <p>Myths - example - See reddit saved post, "<a href="https://www.reddit.com/r/technology/comments/bj2h83/enough_with_the_actually_electric_cars_pollute/">Actually Electric Cars Pollute More</a>" Take the top common myths in this country at the moment and debunk them. Everything from electric cars to global warming and just explain them in a deteiled fact based/source-cited way that eveyone can easily reference and understand.</p> */}
  
      <div className="news-static">
        <div className="news-preview-container story">
          {props.stories?.stories ?
          (props.stories?.stories.map((document, i) => (
            <NewsCard key={i} document={document}/>
          )))
          : 
          <div>Myths Loading...</div>
          }
        </div>
      </div>

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

        {/* {props.stories?.stories ?
        (props.stories?.stories.map((myth, i) => (
          <StoryCard key={i} index={i} length={props.stories.stories.length} myth={myth}/>
        )))
        : 
        <div>Myths Loading...</div>
        } */}
  
      </div>
  
      <div className="myths-footer mb-2 d-none">
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
  stories: state.stories
});

export default connect(
  mapStateToProps
)(Myths);