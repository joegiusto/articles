import React, { useState } from 'react';
import { connect } from "react-redux";

function Local(props) {
  // const [search, changeSearch] = useState("");

  return (
    <section className="local-section">
      
      <h2>Local Providers</h2>

      <div className="row mr-3">

        <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
          <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://data.poughkeepsiejournal.com/media/brand_map_logo/POU.png" alt=""/>
        </div>

        <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
          <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://townsquare.media/site/854/files/2017/08/hudsonvalleypost-logo-v2.jpg" alt=""/>
        </div>

        <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
          <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://midhudsonnews.com/wp-content/uploads/2021/01/rsz_mhn-logo-with-tagline-optimized.png" alt=""/>
        </div>

        <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
          <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://daily-voice-res.cloudinary.com/image/upload/v1437498082/static/dv-logo-large.png" alt=""/>
        </div>

      </div>

    </section>
  );
}

const mapStateToProps = state => ({
  // myths: state.myths,
});

export default connect(
  mapStateToProps
)(Local);