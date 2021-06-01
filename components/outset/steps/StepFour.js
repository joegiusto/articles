import React, { Component } from 'react';

// import articlesLogo from '../../assets/img/logo.png';
// import articlesCard from '../../assets/img/card-1.png';

function PolitcalPartyCard(props) {
  return (
    <div onClick={() => ( props.changeFocus(props.backend_name) + props.changeParty(props.backend_name) )} className={"politcal-party-card " + props.backend_name + (props.currentParty === props.backend_name ? ' active' : '')}>
      <div className="body">
        <img className="full-background" src={props.fullImage} alt=""/>
        <div className="image"></div>
        <img className="logo" src={props.logo} alt=""/>
        <div className="info"></div>
      </div>
      <div className="footer">
        <div className="name">{props.display_name}</div>
      </div>
    </div>
  )
}

class StepFourNew extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

    this.props.changeFocus(this.props.currentParty)

  }

  render(props) {

    return (
      <div className="party-group outset-details-scroll mb-3">

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Articles Party"
          backend_name="articles"
        //   fullImage={articlesCard}
          logo={'https://cdn.articles.media/email/logo.jpg'}
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Democratic Party"
          backend_name="democrat"
          fullImage="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0866/9146/rpolitical-prints-2019-13_shop_preview.png"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Republican Party"
          backend_name="republican"
          fullImage="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Independent"
          backend_name="independent"
          fullImage="https://cdn.vox-cdn.com/thumbor/JYi5YEy3FR-XaRWOthiYbnkDQzM=/0x0:3500x2333/1200x675/filters:focal(1470x887:2030x1447)/cdn.vox-cdn.com/uploads/chorus_image/image/65161923/GettyImages_975466978.0.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Green Party"
          backend_name="green"
          fullImage="https://www.carbonbrief.org/wp-content/uploads/2015/08/stock-forest-wood-england-UK-1550x804.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Libertarian Party"
          backend_name="libertarian"
          fullImage="https://media.istockphoto.com/photos/gadsden-flag-picture-id1162422903?k=6&m=1162422903&s=612x612&w=0&h=xaqtKCUQrkV-XCLj4NRE1Pp9i7_vBXKXH-bo6YXBLcM="
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Constitution Party"
          backend_name="constitution"
          fullImage="https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/USconstitutionWeThePeople.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Reform Party"
          backend_name="reform"
          fullImage="http://southvault.com/wp-content/uploads/2018/09/Construction-Site-Security.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Legal Marijuana Now Party"
          backend_name="legal-marijuana-now"
          fullImage="http://www.medicalmarijuanainc.com/wp-content/uploads/2018/04/Cannabis-leaves-header_1200x500_0005_iStock-503022286.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Socialist Equality Party"
          backend_name="socialist-equality"
          fullImage="https://api.wbez.org/v2/images/6e0286a3-3f92-44da-9d5b-bb105f7ed295.jpg?width=640&height=312&mode=FILL&threshold=0"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Justice Party"
          backend_name="justice"
          fullImage="https://pblog.hertz.com/wp-content/uploads/2019/02/img-lrg-PHILLYSINDYHALL.jpg"
        />

        <PolitcalPartyCard 
          {...this.props} 
          display_name="Other"
          backend_name="other"
          fullImage="https://wallpaperaccess.com/full/318056.png"
        />
        

        {/* <div onClick={() => (props.changeParty('green'))} className={"politcal-party-card green" + (props.currentParty === 'green' ? ' active' : '')}>
          <img className="full-background" src="https://www.carbonbrief.org/wp-content/uploads/2015/08/stock-forest-wood-england-UK-1550x804.jpg" alt=""/>
          <div className="image"></div>
          <div className="name">Green Party</div>
          <div className="info"></div>
        </div> */}

        {/* <div className="politcal-party-card libertarian">
          <img className="full-background" src="https://media.istockphoto.com/photos/gadsden-flag-picture-id1162422903?k=6&m=1162422903&s=612x612&w=0&h=xaqtKCUQrkV-XCLj4NRE1Pp9i7_vBXKXH-bo6YXBLcM=" alt=""/>
          <div className="image"></div>
          <div className="name">Libertarian Party</div>
          <div className="info"></div>
        </div>

        <div className="politcal-party-card constitution">
          <img className="full-background" src="https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/USconstitutionWeThePeople.jpg" alt=""/>
          <div className="image"></div>
          <div className="name">Constitution Party</div>
          <div className="info"></div>
        </div>

        <div className="politcal-party-card reform">
          <img className="full-background" src="http://southvault.com/wp-content/uploads/2018/09/Construction-Site-Security.jpg" alt=""/>
          <div className="image"></div>
          <div className="name">Reform Party</div>
          <div className="info"></div>
        </div> */}

        {/* <div className="politcal-party-card legal-weed">
          <img className="full-background" src="http://www.medicalmarijuanainc.com/wp-content/uploads/2018/04/Cannabis-leaves-header_1200x500_0005_iStock-503022286.jpg" alt=""/>
          <div className="image"></div>
          <div className="name">Legal Marijuana Now Party</div>
          <div className="info"></div>
        </div>

        <div className="politcal-party-card socialist-equality">
          <img className="full-background" src="https://api.wbez.org/v2/images/6e0286a3-3f92-44da-9d5b-bb105f7ed295.jpg?width=640&height=312&mode=FILL&threshold=0" alt=""/>
          <div className="image"></div>
          <div className="name">Socialist Equality Party</div>
          <div className="info"></div>
        </div>

        <div className="politcal-party-card justice">
          <img className="full-background" src="https://pblog.hertz.com/wp-content/uploads/2019/02/img-lrg-PHILLYSINDYHALL.jpg" alt=""/>
          <div className="image"></div>
          <div className="name">Justice Party</div>
          <div className="info"></div>
        </div> */}

      </div>
    )
  }
}

const StepFour = (props) => (

  <div className="party-group outset-details-scroll mb-3">

    <PolitcalPartyCard 
      {...props} 
      display_name="Articles Party"
      backend_name="articles"
      fullImage={articlesCard}
      logo={'https://cdn.articles.media/email/logo.jpg'}
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Democratic Party"
      backend_name="democrat"
      fullImage="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0866/9146/rpolitical-prints-2019-13_shop_preview.png"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Republican Party"
      backend_name="republican"
      fullImage="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Independent"
      backend_name="independent"
      fullImage="https://cdn.vox-cdn.com/thumbor/JYi5YEy3FR-XaRWOthiYbnkDQzM=/0x0:3500x2333/1200x675/filters:focal(1470x887:2030x1447)/cdn.vox-cdn.com/uploads/chorus_image/image/65161923/GettyImages_975466978.0.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Green Party"
      backend_name="green"
      fullImage="https://www.carbonbrief.org/wp-content/uploads/2015/08/stock-forest-wood-england-UK-1550x804.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Libertarian Party"
      backend_name="libertarian"
      fullImage="https://media.istockphoto.com/photos/gadsden-flag-picture-id1162422903?k=6&m=1162422903&s=612x612&w=0&h=xaqtKCUQrkV-XCLj4NRE1Pp9i7_vBXKXH-bo6YXBLcM="
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Constitution Party"
      backend_name="constitution"
      fullImage="https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/USconstitutionWeThePeople.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Reform Party"
      backend_name="reform"
      fullImage="http://southvault.com/wp-content/uploads/2018/09/Construction-Site-Security.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Legal Marijuana Now Party"
      backend_name="legal-marijuana-now"
      fullImage="http://www.medicalmarijuanainc.com/wp-content/uploads/2018/04/Cannabis-leaves-header_1200x500_0005_iStock-503022286.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Socialist Equality Party"
      backend_name="socialist-equality"
      fullImage="https://api.wbez.org/v2/images/6e0286a3-3f92-44da-9d5b-bb105f7ed295.jpg?width=640&height=312&mode=FILL&threshold=0"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Justice Party"
      backend_name="justice"
      fullImage="https://pblog.hertz.com/wp-content/uploads/2019/02/img-lrg-PHILLYSINDYHALL.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      display_name="Other"
      backend_name="other"
      fullImage="https://wallpaperaccess.com/full/318056.png"
    />
    

    {/* <div onClick={() => (props.changeParty('green'))} className={"politcal-party-card green" + (props.currentParty === 'green' ? ' active' : '')}>
      <img className="full-background" src="https://www.carbonbrief.org/wp-content/uploads/2015/08/stock-forest-wood-england-UK-1550x804.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Green Party</div>
      <div className="info"></div>
    </div> */}

    {/* <div className="politcal-party-card libertarian">
      <img className="full-background" src="https://media.istockphoto.com/photos/gadsden-flag-picture-id1162422903?k=6&m=1162422903&s=612x612&w=0&h=xaqtKCUQrkV-XCLj4NRE1Pp9i7_vBXKXH-bo6YXBLcM=" alt=""/>
      <div className="image"></div>
      <div className="name">Libertarian Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card constitution">
      <img className="full-background" src="https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/USconstitutionWeThePeople.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Constitution Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card reform">
      <img className="full-background" src="http://southvault.com/wp-content/uploads/2018/09/Construction-Site-Security.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Reform Party</div>
      <div className="info"></div>
    </div> */}

    {/* <div className="politcal-party-card legal-weed">
      <img className="full-background" src="http://www.medicalmarijuanainc.com/wp-content/uploads/2018/04/Cannabis-leaves-header_1200x500_0005_iStock-503022286.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Legal Marijuana Now Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card socialist-equality">
      <img className="full-background" src="https://api.wbez.org/v2/images/6e0286a3-3f92-44da-9d5b-bb105f7ed295.jpg?width=640&height=312&mode=FILL&threshold=0" alt=""/>
      <div className="image"></div>
      <div className="name">Socialist Equality Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card justice">
      <img className="full-background" src="https://pblog.hertz.com/wp-content/uploads/2019/02/img-lrg-PHILLYSINDYHALL.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Justice Party</div>
      <div className="info"></div>
    </div> */}

  </div>
)

export default StepFourNew;