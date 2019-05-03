import React from 'react';
import StoreItem from './StoreItem';

const storeContent = [
	{
    title: 'Wolf Sweatshirt',
    orgin: 'Original',
		description:
		'One part of the two part first realese. ',
		button: 'Add to Cart',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
		user: 'Luan Gjokaj',
    userProfile: 'https://i.imgur.com/JSW6mEk.png',
    cost: '$21.00',
    profit: '$30.00'
	},
	{
    title: 'Sheep Sweatshirt',
    orgin: 'Original',
		description:
    'One part of the two part first realese.',
		button: 'Add to Cart',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
		user: 'Erich Behrens',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
    title: 'Partner Item',
    orgin: 'Partner',
		description:
		'Short Description',
		button: 'Pre Order',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
  },
  {
    title: 'Partner Item',
    orgin: 'Partner',
		description:
		'Short Description',
    button: 'Pre Order',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];

const StorePage = () => (
  <div className='container'>
    <div className='row'>

    {storeContent.map((item, index) => (
				<div className="col-3">

  					<div className="inner h-100 d-flex">
  						<h1>{item.title}</h1>
  						<p>{item.description}</p>
              <div className="d-flex pr-5" style={{justifyContent: 'space-between'}}>
                <p>{item.cost}</p>
                <p>{item.profit}</p>
              </div>
              <div>
              	<select className="btn btn-black">
	                <option value="S">S</option>
	                <option value="M">M</option>
	                <option value="L">L</option>
	              </select>
	  						<button className="btn btn-black ml-2">{item.button}</button>
              </div>
  					</div>
				</div>
      ))}

      {/* <div style={{height: '100px'}} className="col-12"></div> */}

			<div className="slick-container">

				<StoreItem title="Wolf Sweatshirt" color="articles"/>

				<StoreItem title="Sheep Sweatshirt" color="articles"/>

				<div className="slick-slide d-inline-block" style={{width: '200px'}}>
					<div className="menu-catalog-item">
						<div className="menu-catalog-item-banner btn-outline-info">
								<span>Partner</span>
						</div>
						{/* <!-- <h5>...</h5> --> */}
						<h5 className="mb-0 pb-1">...</h5>
						{/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
						<div className="menu-catalog-item-photo-experimental-background backdrop-yesTheory"></div>
						<div className="menu-catalog-item-photo-experimental floor-yesTheory"></div>
						<div className="menu-catalog-item-photo-gallery">
								<button className="btn btn-yesTheory active">1</button>
								<button className="btn btn-yesTheory">2</button>
								<button className="btn btn-yesTheory">3</button>
								<button className="btn btn-yesTheory">4</button>
								<button className="btn btn-yesTheory">5</button>
								<button className="btn btn-yesTheory">6</button>
						</div>
						<button className="btn btn-outline-info">View</button>
						<button className="btn btn-outline-info">+</button>
					</div>
				</div>

				<div className="slick-slide d-inline-block" style={{width: '200px'}}>
					<div className="menu-catalog-item">
						<div className="menu-catalog-item-banner btn-outline-danger">
								<span>Sponsered</span>
						</div>
						{/* <!-- <h5>...</h5> --> */}
						<h5 className="mb-0 pb-1">...</h5>
						{/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
						<div className="menu-catalog-item-photo-experimental-background backdrop-red"></div>
						<div className="menu-catalog-item-photo-experimental floor-red"></div>
						<div className="menu-catalog-item-photo-gallery">
								<button className="btn btn-red active">1</button>
								<button className="btn btn-red">2</button>
								<button className="btn btn-red">3</button>
								<button className="btn btn-red">4</button>
								<button className="btn btn-red">5</button>
								<button className="btn btn-red">6</button>
						</div>
						<button className="btn btn-outline-danger">View</button>
						<button className="btn btn-outline-danger">+</button>
					</div>
				</div>

				<div className="slick-slide d-inline-block" style={{width: '200px'}}>
					<div className="menu-catalog-item">
						<div className="menu-catalog-item-banner btn-outline-primary">
								<span>Partner</span>
						</div>
						{/* <!-- <h5>...</h5> --> */}
						<h5 className="mb-0 pb-1">...</h5>
						{/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
						<div className="menu-catalog-item-photo-experimental-background backdrop-blue"></div>
						<div className="menu-catalog-item-photo-experimental floor-blue"></div>
						<div className="menu-catalog-item-photo-gallery">
								<button className="btn btn-blue active">1</button>
								<button className="btn btn-blue">2</button>
								<button className="btn btn-blue">3</button>
								<button className="btn btn-blue">4</button>
								<button className="btn btn-blue">5</button>
								<button className="btn btn-blue">6</button>
						</div>
						<button className="btn btn-outline-primary">View</button>
						<button className="btn btn-outline-primary">+</button>
					</div>
				</div>

			</div>

    </div>
  </div>
);

export default StorePage;