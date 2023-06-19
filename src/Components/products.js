import React from 'react'
import IndividualProduct from './IndividualProduct'
import { useSelector } from 'react-redux'

export default function Products() {

  const products = useSelector(state=>state.products.products)

    return products.map(product=> <IndividualProduct 
      product={product} key={product.id} id={product.id} />) 

}