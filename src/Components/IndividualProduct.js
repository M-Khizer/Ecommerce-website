import { collection,doc,setDoc } from 'firebase/firestore';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fs } from '../Config/config';

export default function IndividualProduct({product,id}) {
    
  const nav = useNavigate();
  const uid = useSelector(state=>state.user.uid)
  let Product;
    // console.log(uid)


    const addToCart = ()=>{
      
      if (uid){
      
        let qty= 1;
        let TotalPrice = qty*product.product.price;
        let cart = {qty,
                    TotalPrice,
                    title:product.product.title,
                    description:product.product.description,
                    price:product.product.price,
                    url:product.product.url
                  }
        setDoc(doc(fs,'Cart '+ uid,product.id),cart).then(()=>{
          console.log('cart created')
        })
      }
      else{
        nav('/signin')
      }
    }

  return (
    <div className='product'>
        <div className='product-img'>
            <img src={product.product.url} width={300}/>
        </div>

    <div className='product-text title'>{product.product.title}</div>    
    <div className='product-text description'>{product.product.description}</div>        
    <div className='product-text price'>${product.product.price}</div>
        
    <div className='btn btn-danger btn-md cart-btn' onClick={addToCart}>ADD TO CART</div>        
    
    </div>
  )
}
