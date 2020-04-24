import React from 'react'

const NoMatchCard  = props => (
  <div className="no-matches">
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
    <div className="message">
      You are not subscribed to any {props.type}, to see all stories click <span onClick={() => {this.setFilter('all')}} style={{color: 'green'}}>here</span>
    </div>
  </div>
)


export default NoMatchCard