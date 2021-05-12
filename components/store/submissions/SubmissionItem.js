import React, { Component } from 'react';

class SubmissionItemNew extends Component {
  constructor(props) {
  super(props);

    this.state = {
        photos: ['https://cdn.articles.media/submissions/fake/america.jpg', 'https://cdn.articles.media/submissions/fake/demand.jpg', 'https://cdn.articles.media/submissions/fake/neutral.jpg', 'https://cdn.articles.media/submissions/fake/rich.jpg', 'https://cdn.articles.media/submissions/fake/swallow.jpg', 'https://cdn.articles.media/submissions/fake/truth.jpg', 'https://cdn.articles.media/submissions/fake/vote.jpg']
    };

  }

  renderRandom() {
    //   remove this garbage
    // console.log('Ran')
    var random_boolean = Math.random() <= 0.5;

    if (random_boolean) {
      // console.log('One')
      return 'https://cdn.articles.media/submissions/fake/swallow.jpg'
    } else {
      // console.log('Two')
      return 'https://cdn.articles.media/submissions/fake/rich.jpg'
    }

  }

  render(props) {

    return(
        <div className="submission">

            <div className="title d-flex justify-content-between">

                <div>{`${this.props.submission?.user_id?.first_name} ${this.props.submission?.user_id?.last_name}`}</div>

                <div>{this.props.submission?.user_id?.address?.state}</div>

            </div>

            <div className="photo">
                <img src={this.state.photos[Math.floor(Math.random() * this.state.photos.length)]} alt=""/>
            </div>

            <div className="vote-controls">

                <div className="voting-bar">

                    <button className="dislike btn btn-articles-light btn-sm">
                        <i className="far fa-thumbs-down" aria-hidden="true"></i>
                    </button>

                    <button className="like btn btn-articles-light btn-sm">
                        <i className="far fa-thumbs-up" aria-hidden="true"></i>
                    </button>

                    {/* <div className="like">
                    <i className="far fa-thumbs-up" aria-hidden="true"></i>
                    </div> */}

                    {/* <div className="dislike">
                    <i className="far fa-thumbs-down" aria-hidden="true"></i>
                    </div> */}

                </div>

                <div class="progress">
                    <div class="progress-bar dislike w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50% (1)</div>
                    <div class="progress-bar like w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50% (1)</div>
                </div>

                {/* <div className="visual-bar d-none">
                    <div className="like"></div>
                    <div className="dislike"></div>
                </div> */}

                <div className="view-button">
                    <button className="btn btn-articles-light btn-sm">View</button>
                </div>

            </div>

      </div>
    )
  }
  
}

export default SubmissionItemNew