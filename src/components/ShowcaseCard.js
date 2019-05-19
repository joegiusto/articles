import React, { useState, useEffect } from 'react';

export default function ShowcaseCard(props) {
  const [open, openCard] = useState(false);
  const [moreText, changeMoreText] = useState(false);

    if (open === true) {
        setTimeout(() => {
            // this.setState({ position: 1 });
            // console.log('Three');
            changeMoreText(true);
            // useEffect(changeMoreText(true), []);
        }, 550);
    } else {
        setTimeout(() => {
            // this.setState({ position: 1 });
            // console.log('Three');
            changeMoreText(false);
            // useEffect(changeMoreText(true), []);
        }, 1);
    }

//     // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     // document.title = `You clicked ${open} times`;
//     if (open === true) {
//         setTimeout(() => {
//             // this.setState({ position: 1 });
//             console.log('Three');
//         }, 3000);
//     }
//   });

  return (
      <div className="col">
          <div className={"card card-showcase " + props.cardClass}>

              <div className="card-title-new">{props.title}</div>

              {/* <div className="card-center">
                  <div className="buttonLeft"></div>
                  <div className="buttonRight"></div>
              </div> */}

              <div className={"card-footer-new " + (open ? 'open' : '')}>
                    <div className={"roadmap-expanded " + (moreText ? 'show' : '')}>
                        <h5>Stage One</h5>
                        <p>{props.stageOne ? props.stageOne : '?'}</p>
                        <h5>Stage Two</h5>
                        <p>{props.stageTwo ? props.stageTwo : '?'}</p>
                        <h5>Stage Three</h5>
                        <p>{props.stageThree ? props.stageThree : '?'}</p>
                        <h5>Stage Four</h5>
                        <p>{props.stageFour ? props.stageFour : '?'}</p>
                        <h5>Stage Five</h5>
                        <p>{props.stageFive ? props.stageFive : '?'}</p>
                    </div>
                    <div className="roadmap-bottom">
                        <p className="description">{props.description}</p>
                        <hr />
                        <div className="card-footer-flex pb-2">
                            {/* <div>{clothingPercent}</div> */}
                            <div>Stage {props.stage}</div>
                            <div className="roadmap-click" onClick={() => openCard(!open)}>Roadmap <i className="fas fa-angle-right"></i></div>
                        </div>
        
                        {/* <a className="footer-roadmap" href="#">
                            <p>Roadmap <i className="fas fa-angle-right"></i></p>
                        </a> */}
                        <div className="alt-progress">
                            <div className="progress">
                                <div className="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                                    role="progressbar" style={{width: (props.percent) + '%' }} aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100"></div>
                            </div>
                            <div className={"bullet bullet-0 " + (props.percent >= 0 ? '' : 'bullet-active')}></div>
                            <div className={"bullet bullet-20 " + (props.percent >= 20 ? '' : 'bullet-active')}></div>
                            <div className={"bullet bullet-40 " + (props.percent >= 40 ? '' : 'bullet-active')}></div>
                            <div className={"bullet bullet-60 " + (props.percent >= 60 ? '' : 'bullet-active')}></div>
                            <div className={"bullet bullet-80 " + (props.percent >= 80 ? '' : 'bullet-active')}></div>
                            <div className={"bullet bullet-100 " + (props.percent >= 100 ? '' : 'bullet-active')}></div>
                        </div>
                    </div>
              </div>

          </div>

          {/* <p>Card Open? {open ? 'Yes' : 'No'}</p>
          <button onClick={() => openCard(!open)}>Toggle</button>
          <button onClick={() => openCard(true)}>Open</button>
          <button onClick={() => openCard(false)}>Close</button> */}

      </div>

      

  );
}