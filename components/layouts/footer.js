import React from 'react'

import { connect, useSelector, useDispatch } from 'react-redux';

import Link from 'next/link'
import { useRouter } from 'next/router'

import ROUTES from '../constants/routes'
import { toggleColorMode } from '../../redux/actions/siteActions';
// import { toggleColorMode } from '../../actions/siteActions';

const useCounter = () => {
    const colorModeDark = useSelector((state) => state.site.colorModeDark)
    return { colorModeDark }
}

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

function FooterBase(props) {
    //   const has =  props.location.pathname.toString().includes("/admin/news") 
    const dispatch = useDispatch()
    const { colorModeDark } = useCounter()

    const router = useRouter()

    // console.log(router)

    if ( [ROUTES.MESSAGES, ROUTES.OUTSET].some(el => router.asPath.includes(el) ) ) {
        return null
    }

    return (
        <footer className={"site-footer"}>

            {/* New February 2021 */}      
            <div className="container py-4">

                <div className="row mb-4">

                <div className="col-lg-3 footer-panel first">

                    <Link href={ROUTES.LANDING}><a className="brand">Articles Media</a></Link>

                    <div className="icons">

                    <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                    </a>

                    <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>

                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>

                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>

                    </div>

                </div>

                <div className="col-lg-3 ml-lg-5 footer-panel mb-3 mb-lg-0">

                    <div className="panel-title title border-bottom border-dark mb-2">Main</div>

                    <div className="row">

                    <div className="col-6">
                        <Link href={ROUTES.TRANSPARENCY}><a>Transparency</a></Link>
                        <Link href={ROUTES.STORE}>Store</Link>
                        <Link href={ROUTES.PARTY}>Politics</Link>
                    </div>

                    <div className="col-6">
                        <Link href={ROUTES.STORIES}>Stories</Link>
                        <Link href={ROUTES.ISSUES}>Issues</Link>
                        <Link href={ROUTES.MYTHS}>Myths</Link>
                    </div>

                    </div>

                </div>

                <div className="col-6 col-lg-2 ml-lg-5 footer-panel">
                    <div className="panel-title title border-bottom border-dark mb-2">Community</div>
                    <Link href={ROUTES.POLLS}>Polls</Link>
                    <Link href={ROUTES.UPDATES}>Updates</Link>
                    <Link href={ROUTES.ROADMAP}>Roadmap</Link>
                </div>

                <div className="col-6 col-lg-2 ml-lg-5 footer-panel">
                    <div className="panel-title title border-bottom border-dark mb-2">About Us</div>
                    <Link href={ROUTES.MISSION}>Mission</Link>
                    <Link href={ROUTES.PRESS}>Press and Business</Link>
                    <Link href={ROUTES.FAQ}>FAQ</Link>
                </div>

                </div>

                <div style={{lineHeight: '1'}} className="row border-top footer-panel copyright pt-3 px-3 d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">

                    <div className="d-flex flex-shrink-0">
                        <span>©2021 Articles Media</span>
                        <span className="ml-1 pl-1 border-left border-dark"><Link href={ROUTES.PRIVACY}>Terms</Link></span>
                        <span className="ml-1 pl-1 border-left border-dark"><Link href={ROUTES.PRIVACY}>Privacy</Link></span>
                    </div>

                    {/* <div> */}
                    <div onClick={props.toggleColorMode} className="btn btn-articles-light btn-sm mt-3 mt-lg-0 noselect">
                        { (colorModeDark ? <i className="fas fa-sun mr-1"></i> : <i className="fas fa-moon mr-1"></i>) }
                        { (colorModeDark ? "Light Theme" : "Dark Theme") }
                        {/* <div className="beta badge badge-articles">Beta!</div> */}
                    </div>
                    {/* </div> */}

                </div>

            </div>

        </footer>
    )
}

const mapStateToProps = (state) => {

	return {
		site: state.site,
	};
  
};

// export default connect(null, toggleColorMode)(FooterBase);

// const Footer = withRouter(FooterBase);

export default connect(
	null,
	{ toggleColorMode } 
)(FooterBase);