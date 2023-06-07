import React from 'react'

export default function IndividualProduct({product}) {
    
    // console.log(product)
  return (
    <div className='product'>
        <div className='product-img'>
            <img src={product.product.url} width={300}/>
        </div>

    <div className='product-text title'>{product.product.title}</div>    
    <div className='product-text description'>{product.product.description}</div>        
    <div className='product-text price'>${product.product.price}</div>        
    <div className='btn btn-danger btn-md cart-btn'>ADD TO CART</div>        
    
    </div>
  )
}
