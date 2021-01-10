import React from 'react';

const languages = [
  ['English', '254 million native speakers'],
  ['Spanish', '43,200,000 native speakers'],
  ['Chinese', '2,900,000 native speakers'],
  ['Tagalog', '1,610,000 native speakers'],
  ['Vietnamese', '1,400,000 native speakers'],
  ['Arabic', '1,400,000 native speakers'],
  ['French', '1,281,300 native speakers']
]

const Page = () => (
  <div className="translations-page">
    <div className="container">
  
      <div className="row h-100 justify-content-center">
        <div className="col-12 col-md-8 col-xl-6 my-auto">
          <div className="card card-block">
            
            <h1>Translations</h1>

            <p className="mt-2">We currently do not have a language setting on our site but this is something we have in mind for the near future. We want any American to be able to use our site and gather news and information at ease, no matter the language.</p>
            <p>In the meantime we recommend a browser extension like this one (Chrome users)</p>

            <div>
              <i className="fab fa-chrome"></i>
              <a href="https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb/RK%3D2/RS%3DBBFW_pnWkPY0xPMYsAZI5xOgQEE-">Google Translate</a>
            </div>

            <hr className="mt-4"/>

            <p className="mt-3">Below is a chart to remind people of just how diverse this country is...</p>

            <h3 className="info-title">US Census Bureau Data</h3>

            <div className="info-wrap">

              <img className="img-fluid" src="https://ichef.bbci.co.uk/news/624/cpsprodpb/ACC9/production/_103933244_top_ten-nc.png" alt=""/>

              <div className="languages">

                {languages.map((language, i) => 
                  <div className="language">
                    <span className="name">{language[0]}</span>
                    <span className="amount">{language[1]}</span>
                  </div>
                )}
                
              </div>

              <div className="text-muted text-small">Data from 2017</div>
            </div>

            <p className="mt-4">To keep up with our transparency efforts we plan to show the percent of what languages people are using on our site when we have this feature added.</p>

            <h3 className="info-title">Articles User Data</h3>

            <div className="info-wrap">

              <div className="text-center w-100 py-3">Information will be displayed when enough data is gathered</div>

            </div>

          </div>
        </div>
      </div>
  
    </div>
  </div>
);

export default Page 