import React from 'react';
import moment from 'moment';

class StepFive extends React.Component {
  render() {
      return (
        <div className="accept-scroll">

          <div className="accept-tiles">
  
            <div className="accept-tile">
              <h5>Privacy Policy</h5>
  
              <div className="text">
                We respect your privacy and abide by all the rules and regualations set fourth in the <a href="">The Gramm-Leach-Bliley Act</a>, <a href="">COPPA</a>, <a href="">CalOPPA</a>, <a href="">SOPIPA</a>, <a href="">Content Eraser Law</a>.
              </div>
  
              <div className="accept-row">
                <label>I accept</label>
                <button className={"accept-button" + (this.props.privacyAccept === true ? ' active' : '')} type="checkbox" id="privacy" name="privacyAccept" onClick={() => this.props.handleChangeObjectToState({
                  privacyAccept: !this.props.privacyAccept
                })}>
                  <div className="signature">{`${this.props.nameFirst} ${this.props.nameLast} - ${moment().format("LL")}`}</div>
                  <div className="signature-confirm">Click Here</div>
                  
                </button>
              </div>
  
            </div>
  
            <div className="accept-tile">
              <h5>Cookie Usage</h5>
  
              <div className="text">
                To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.
              </div>
  
              <div className="accept-row">
                <label>I accept</label>
                <button className={"accept-button" + (this.props.cookieAccept === true ? ' active' : '')} type="checkbox" id="privacy" name="privacyAccept" onClick={() => this.props.handleChangeObjectToState({
                  cookieAccept: !this.props.cookieAccept
                })}>
                  <div className="signature">{`${this.props.nameFirst} ${this.props.nameLast} - ${moment().format("LL")}`}</div>
                  <div className="signature-confirm">Click Here</div>
                  
                </button>
              </div>
  
            </div>
  
            <div className="accept-tile">
              <h5>Terms Of Use</h5>
  
              <div className="text">
                The service you are using is by a private company that at any time can refuse you of posting or uploading content to our site. Any original content or media you upload to the site that was created by you is yours and can not be used in any advertising or monitization purposes by us without permission from you the user.
              </div>
  
              <div className="accept-row">
                <label>I accept</label>
                <button className={"accept-button" + (this.props.termsAccept === true ? ' active' : '')} type="checkbox" id="privacy" name="privacyAccept" onClick={() => this.props.handleChangeObjectToState({
                  termsAccept: !this.props.termsAccept
                })}>
                  <div className="signature">{`${this.props.nameFirst} ${this.props.nameLast} - ${moment().format("LL")}`}</div>
                  <div className="signature-confirm">Click Here</div>
                  
                </button>
              </div>
  
            </div>
  
          </div>
          
        </div>
      )
  }
}

export default StepFive;