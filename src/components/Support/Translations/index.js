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
            <p>Articles is an American focused company, which means we want any American to be able to use our site and gather news and information at ease. During this time in development, translations have very limited support if any at all. Based on the data from the US Census Bureau, we will roll out translations to Spanish speakers and work from there into Chinese translations and so on. In the mean time we reccomend this extension for Chrome users to help you.</p>
            <path fill="url(#e)" d="M8 20v140c0 6.6 5.4 12 12 12h152c6.6 0 12-5.4 12-12V20H8zm108 32H76c-4.42 0-8-3.58-8-8s3.58-8 8-8h40c4.42 0 8 3.58 8 8s-3.58 8-8 8z"></path>

            <a href="https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb/RK%3D2/RS%3DBBFW_pnWkPY0xPMYsAZI5xOgQEE-">Google Translate Extension (Chrome)</a>

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
            </div>

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