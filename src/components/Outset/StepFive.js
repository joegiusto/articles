import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

class StepFive extends React.Component {
  render() {
      return (
        <div className="accept-scroll">

          <div className="accept-tiles">
  
            <div className="accept-tile">
              <h5>Privacy Policy</h5>
  
              <div className="text">
                We respect your privacy and abide by all the rules and regulations set fourth in the <a href="https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule" target="_blank" rel="noopener noreferrer">COPPA</a>, <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">CCPA</a>, <a href="https://www.dwt.com/insights/2014/11/californias-online-eraser-law-for-minors-to-take-e#:~:text=California%20S.B.,posted%20on%20the%20operator's%20website." target="_blank" rel="noopener noreferrer">Content Eraser Law</a> as well as our own Privacy Policy.
              </div>

              <Accordion className="mt-3">

                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <div className="d-flex justify-content-between">
                      <div>View</div>
                      <div>Click to Expand</div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>

                      We are still in beta and our Privacy Policy is not yet complete, it will be placed here before launch.

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

              </Accordion>
  
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
                To make this site work properly, we sometimes place small data files called cookies on your device. Almost all websites do this.
              </div>

              <Accordion className="mt-3">

                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <div className="d-flex justify-content-between">
                      <div>View</div>
                      <div>Click to Expand</div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>

                      We are still in beta and our Cookie Usage is not yet complete, it will be placed here before launch.

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

              </Accordion>
  
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