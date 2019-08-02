import React, { useState } from 'react';

export default function Myths(props) {
  const [search, changeSearch] = useState("");


  return (
  <div className='container text-center'>
    <div className="mt-5 mb-2">
      <h1>Myths</h1>
      <p>Myths - example - See reddit saved post, "<a href="https://www.reddit.com/r/technology/comments/bj2h83/enough_with_the_actually_electric_cars_pollute/">Actually Electric Cars Pollute More</a>" Take the top common myths in this country at the moment and debunk them. Everything from electric cars to global warming and just explain them in a deteiled fact based/source-cited way that eveyone can easily reference and understand.</p>
    </div>
    <div className="row">
    
      <div className="col-12 mb-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
          </div>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search Titles and Topics..." 
            value={search} aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(event) => changeSearch(event.target.value)}
          />
        </div>
        <h4 className="mt-2">
          <span onClick={() => changeSearch("Global Warming")} className="badge badge-pill badge-warning myth-topic">Global Warming</span>
          <span onClick={() => changeSearch("Electric Cars")} className="badge badge-pill badge-info myth-topic">Electric Cars</span>
          <span onClick={() => changeSearch("Flint Michigan")} className="badge badge-pill badge-primary myth-topic">Flint Michigan</span>
          <span onClick={() => changeSearch("Vaccinations")} className="badge badge-pill badge-danger myth-topic">Vaccinations</span>
          <span onClick={() => changeSearch("Green Energy")} className="badge badge-pill badge-success myth-topic">Green Energy</span>
          <span onClick={() => changeSearch("Police Police Casualties")} className="badge badge-pill badge-primary myth-topic">Police Police Casualties</span>
          <span onClick={() => changeSearch("Crime Rate")} className="badge badge-pill badge-secondary myth-topic">Crime Rate</span>
          <span onClick={() => changeSearch("Health")} className="badge badge-pill border btn-outline-dark alert-primary myth-topic">Health</span>
          <span onClick={() => changeSearch("")} className="badge badge-pill border btn-outline-dark myth-topic">Example</span>
          <span onClick={() => changeSearch("")} className="badge badge-pill border btn-outline-dark myth-topic">Example</span>
          <span onClick={() => changeSearch("")} className="badge badge-pill border btn-outline-dark myth-topic">Example</span>
        </h4>
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item">
          <div className="myth-item-banner btn-outline-danger">
            <img style={{marginBottom: '5px', marginRight: '5px'}} height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhxMSpwk-QKthsoC3-W29g3OK8C9_02CIrduy3omLVfTG09cU2g" alt=""/>
            Hot
          </div>
          <div className="item-head"></div>
          <div className="item-background"/>
          <div className="item-photo"/>
          <div className='myth-item-title'>Windmills and Cancer</div>
          <div className="item-foot"></div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      <div className="col-12 col-md-6">
        <div className="myth-item"></div>      
      </div>

      </div>
    </div>
  );
}