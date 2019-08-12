import React from 'react';

const SubmissionItem = (props) => (
<div className="col-2">
  <div className="submission-item">
    <div className="submission-user-bar"></div>
    <div className="submission-user">{props.user}</div> 
    <div className={"submission-photo " + props.type}></div>        
    <div className="vote count">{props.voteCount}</div>
    <div className="vote vote-up"><i className="far fa-thumbs-up"></i></div>
    <div className="vote vote-down"><i className="far fa-thumbs-down"></i></div>
  </div>
</div>
);

export default SubmissionItem;