import React from 'react'
import { useSelector } from 'react-redux'
import IndividualCartProducts from './IndividualCartProducts';

export default function CartProducts({cartToggle}) {

    const cartProducts = useSelector(state=>state.cart.cart);

    
  return cartProducts.map(cartProduct=>(
    <IndividualCartProducts cartProduct={cartProduct} 
    key={cartProduct.id} id={cartProduct.id} cartToggle={cartToggle}
    />
  ))
  

}
