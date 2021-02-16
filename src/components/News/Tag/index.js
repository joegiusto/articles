import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

function Tag(props) {
  // const [search, changeSearch] = useState("");

  return (
    <section className="tag-section">

        <div className="header">

            <div className="intro-panel">

                <div className="text-wrapper">
                    <h2>{props.match.params.id}</h2>
                    <p>Sample description of what this tag is about</p>
                </div>

            </div>

            <div className="info-panel">
                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png" alt="Icon of Tesla"/>
            </div>

        </div>

        <div className="content">
            <p>Content</p>
        </div>

    </section>
  );
}

const mapStateToProps = state => ({
  // myths: state.myths,
});

export default connect(
  mapStateToProps
)(withRouter(Tag));