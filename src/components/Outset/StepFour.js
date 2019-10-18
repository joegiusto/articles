import React from 'react';
import articlesLogo from '../../assets/img/logo.png';

function PolitcalPartyCard(props) {
  return (
    <div onClick={() => (props.changeParty(props.party))} className={"politcal-party-card " + props.party + (props.currentParty === props.party ? ' active' : '')}>
      <img className="full-background" src={props.fullImage} alt=""/>
      <div className="image"></div>
      <div className="name">{props.party} {props.appendParty ? 'Party' : ''}</div>
      <div className="info"></div>
    </div>
  )
}

const StepFour = (props) => (

  <div style={{overflowY: 'scroll', height: '360px', paddingRight: '1rem'}} className="party-group mb-3">

    <PolitcalPartyCard 
      {...props} 
      party="democratic"
      appendParty={true}
      fullImage="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0866/9146/rpolitical-prints-2019-13_shop_preview.png"
    />

    <PolitcalPartyCard 
      {...props} 
      party="republican"
      appendParty={true}
      fullImage="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
    />

    <PolitcalPartyCard 
      {...props} 
      party="independent"
      appendParty={false}
      fullImage="https://cdn.vox-cdn.com/thumbor/JYi5YEy3FR-XaRWOthiYbnkDQzM=/0x0:3500x2333/1200x675/filters:focal(1470x887:2030x1447)/cdn.vox-cdn.com/uploads/chorus_image/image/65161923/GettyImages_975466978.0.jpg"
    />

    {/* <div onClick={() => (props.changeParty('democratic'))} className={"politcal-party-card democrats" + (props.currentParty === 'democratic' ? ' active' : '')}>
      <img className="full-background" src="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0866/9146/rpolitical-prints-2019-13_shop_preview.png" alt=""/>
      <div className="image"></div>
      <div className="name">Democratic Party</div>
      <div className="info"></div>
    </div> */}

    {/* <div onClick={() => (props.changeParty('republican'))} className={"politcal-party-card republican" + (props.currentParty === 'republican' ? ' active' : '')}>
      <img className="full-background" src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Republican Party</div>
      <div className="info"></div>
    </div> */}
    
    {/* <div className="politcal-party-card independent">
      <img className="full-background" src="https://cdn.vox-cdn.com/thumbor/JYi5YEy3FR-XaRWOthiYbnkDQzM=/0x0:3500x2333/1200x675/filters:focal(1470x887:2030x1447)/cdn.vox-cdn.com/uploads/chorus_image/image/65161923/GettyImages_975466978.0.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Independent &nbsp;</div>
      <div className="info"></div>
    </div> */}

    <div onClick={() => (props.changeParty('green'))} className={"politcal-party-card green" + (props.currentParty === 'green' ? ' active' : '')}>
      <img className="full-background" src="https://www.carbonbrief.org/wp-content/uploads/2015/08/stock-forest-wood-england-UK-1550x804.jpg" alt=""/>
      <div className="image"></div>
      <div className="name">Green Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card libertarian">
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
    </div>

    <div className="politcal-party-card legal-weed">
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
    </div>

    <div className="politcal-party-card articles">
      <div className="image">
        {/* <img src={articlesLogo} alt="Articles Logo"/> */}
      </div>
      <div className="name">Articles Party</div>
      <div className="info"></div>
    </div>

    <div className="politcal-party-card other">
      <div className="image">
        {/* <img src={articlesLogo} alt="Articles Logo"/> */}
      </div>
      {/* <input type="text"/> */}
      <div className="name">Other</div>
      <div className="info"></div>
    </div>

  </div>
)

export default StepFour;