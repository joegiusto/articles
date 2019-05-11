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

		<h1 className="text-center store-heading">Featured</h1>

    <div className='row'>

			<div className="slick-container">

				<StoreItem catalogId='1' title="Wolf Sweatshirt" banner="Original" color="articles" />

				<StoreItem catalogId='2' title="Sheep Sweatshirt" banner="Original" color="articles"/>

				<StoreItem catalogId='3' title="Partner Item" banner="Partner" color="info"/>

				<StoreItem catalogId='4' title="Sponsered Item" banner="Sponsered" color="danger"/>

				<StoreItem catalogId='5' title="Sponsered Item" banner="Sponsered" color="primary"/>

			</div>
			
			<div className="col-12">
				<div className="row text-center">

					<div className="col-6 p-0">
						<div className="store-panel store-panel-image-1">

						</div>
					</div>
					<div className="col-6 p-0">
						<div className="store-panel store-panel-1">

						</div>
					</div>

					<div className="col-6 p-0">
						<div className="store-panel store-panel-image-2">

						</div>
					</div>
					<div className="col-6 p-0">
						<div className="store-panel store-panel-2">

						</div>
					</div>

					{/* <div className="col-4 p-0">
						<div className="store-panel store-panel-image-3">

						</div>
					</div>
					<div className="col-8 p-0">
						<div className="store-panel store-panel-3">

						</div>
					</div> */}

				</div>
			</div>

			<div className="col-12">
				<h3 className="text-center mt-5 mb-4">Top Right Badge Key</h3>
				<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
					<h5>Original Item</h5>
					<p>Items that are designed and sold by us</p>
					<p className="text-muted">Income: Highest profit margin, with aim of being 60% of clothing sales</p>
				</div>
			</div>

			<div className="col-12">
				<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
					<h5>Partner Item</h5>
					<p>Items that we partnered up to sell and split a part of the profit with the company/creators</p>
					<p className="text-muted">Income: Split Profit (Give or take 5%-30%) with partner, expected to be 30% of clothing sales</p>
				</div>
			</div>

			<div className="col-12 ">
				<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
					<h5>Sponsered Item</h5>
					<p>Items that we promote for a company/creator that we feel have a reasonable means to be on the platform. A small referral fee will be charged for the item.</p>
					<p className="text-muted">Income: Lowest Profit, here we really just want to promote people that are also doing good and sending a message out. should not exceed 5%-10% of all clothing sales</p>
				</div>
			</div>

			{storeContent.map((item, index) => (
				<div className="col-3 my-5">

  					<div className="inner h-100 d-flex">
  						<h1>{item.title}</h1>
  						<p>{item.description}</p>
              <div className="d-flex pr-5" style={{justifyContent: 'space-between'}}>
                <p>{item.cost ? item.cost : '$0.00'}</p>
                <p>{item.profit ? item.profit : '$0.00'}</p>
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

    </div>
	
  </div>
);

export default StorePage;