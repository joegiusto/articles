import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

export default function Menu(props) {
  // const cart_items = props.cart_items
  const cart_items = [
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // },
    // {
    //   product_thumbnail: 'https://media.hufworldwide.com/media/catalog/product/cache/small_image/500x500/beff4985b56e3afdbeabfc89641a4582/D/E/DELINCUENTE-L-S-TEE_WHITE_TS01007_WHITE_01.jpg'
    // }
    ...props.cart_items
  ]

  return (
    <div className="menu-cart-preview">
      <div className="tiles">
        {cart_items.map((item, i) => {
          return (
            (i < 8 ? 
              (i < 7 ? 
                <div className="tile">
                  <img src={item.preview} alt=""/>
                </div>
                :
                <div className="tile last">
                  <div className="details">
                    <div>5</div>
                    <div>Others</div>
                  </div>
                </div>
                )
            :
            null
            )
          
          )
        })}
      </div>
      <Link onClick={() => {props.setMenuOpen(false)}} to={ROUTES.CHECKOUT}><div className="btn btn-dark subheading-font mb-2">Edit / Checkout</div></Link>
    </div>
  )
}