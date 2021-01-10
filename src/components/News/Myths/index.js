import React, { useState } from 'react';
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { NewsCard } from '../index'
import IssueCard from './components/MythCard';

function Myths(props) {
  const [search, changeSearch] = useState("");

  return (
 <section className="myths-section">

  <Helmet>
    <title>Myths - Articles</title>
  </Helmet>

  <div className="news-static">
    <div className="news-preview-container myth">
      {props.myths.myths ?
      (props.myths.myths.map((document, i) => (
        <NewsCard key={i} document={document}/>
      )))
      : 
      <div>Myths Loading...</div>
      }
    </div>
  </div>

  {/* {props.myths.myths ?
  (props.myths.myths.map((myth, i) => (
    <IssueCard key={i} index={i} length={props.myths.myths.length} myth={myth}/>
  )))
  : 
  <div>Myths Loading</div>
  } */}

  <div className="myths-footer d-none mt-3">
    <h1 className="title">Liked that?</h1>
    <p className="body">Ask more questions with our partner <a href="https://www.answers.com">Answers.com</a></p>
    <input type="text"/><button>Go</button>
  </div>
  
 </section>
  );
}

const mapStateToProps = state => ({
  myths: state.myths,
});

export default connect(
  mapStateToProps
)(Myths);