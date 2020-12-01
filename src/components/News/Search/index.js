import React, { useState } from 'react';
import { connect } from "react-redux";

function Search(props) {
  const [search, changeSearch] = useState("");

  return (
 <section className="myths-section">

  <div className="news-static">

    <div style={{fontSize: '1.2rem'}} className="d-flex align-items-center">Search Results: <div className="badge badge-articles mr-0 ml-1">{props.searchText}</div></div>

  </div>

  <div className="myths-footer d-none mt-3">
    <h1 className="title">Liked that?</h1>
    <p className="body">Ask more questions with our partner <a href="https://www.answers.com">Answers.com</a></p>
    <input type="text"/><button>Go</button>
  </div>
  
 </section>
  );
}

const mapStateToProps = state => ({
  // myths: state.myths,
});

export default connect(
  mapStateToProps
)(Search);