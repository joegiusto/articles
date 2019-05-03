import React from 'react';
import Countdown from 'react-countdown-now';

const Submissions = () => (
  <div className='container'>
    <h1>Submission Area</h1>
    <p>Here artist and individuals can submit clothing ideas of thier own to have a chance to be voted on and picked to go in our shop. Artist recieves (50% subject to change) of net profit.</p>

    <h1>Trending Submissions<span class="badge badge-secondary ml-2"></span></h1>
    <h5>Next Pick <span class="badge badge-secondary"><Countdown date={'10 May 2019'} /></span></h5>
    <p>Log in to vote.</p>
    <div className="row">
      <div className="col-2">
        <div className="submission-item">
          <div className="submission-user-bar"></div>
          <div className="submission-user">Joey Giusto</div> 
          <div className="submission-photo"></div>        
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
      <div className="col-2">
        <div className="submission-item">
          <div className="submission-user-bar"></div>
          <div className="submission-user">...</div> 
          <div className="submission-photo"></div>        
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
      <div className="col-2">
        <div className="submission-item">
          <div className="submission-user-bar"></div>
          <div className="submission-user">...</div> 
          <div className="submission-photo"></div>        
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
      <div className="col-2">
        <div className="submission-item">
          <div className="submission-user-bar"></div>
          <div className="submission-user">...</div> 
          <div className="submission-photo"></div>        
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
      <div className="col-2">
        <div className="submission-item">
          <div className="submission-user-bar"></div>
          <div className="submission-user">...</div> 
          <div className="submission-photo"></div>        
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
      <div className="col-2">
        <div className="submission-item">
          <div className="vote vote-up"><i class="far fa-thumbs-up"></i></div>
          <div className="vote vote-down"><i class="far fa-thumbs-down"></i></div>
        </div>
      </div>
    </div>
  </div>
);

export default Submissions;