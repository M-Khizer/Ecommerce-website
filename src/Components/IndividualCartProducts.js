import React from 'react'
import Icon from 'react-icons-kit'
import {minus} from 'react-icons-kit/feather/minus'
import {plus} from 'react-icons-kit/feather/plus'
import {fs} from '../Config/config'
import { useSelector } from 'react-redux'
import { updateDoc,doc, deleteDoc } from 'firebase/firestore'

export default function IndividualCartProducts({cartProduct,cartToggle}) {
   
    const uid = useSelector(state=>state.user.uid);
    // setInterval(() => {
    //     console.log(cartProduct.qty)
    // }, 2000);

    const handleIncrement = (cartProduct)=>{
        console.log(cartProduct.qty)
        let qty = cartProduct.qty;
        qty++;
        
        let TotalPrice = qty*cartProduct.price; 
        const cartRef = doc(fs,'Cart '+uid,cartProduct.id);
        updateDoc(cartRef,{qty,TotalPrice}).then(()=>{
            cartToggle()
            console.log("UPDATED")
        })
        

    }

    const handleDecrement = ()=>{
        let qty = cartProduct.qty;
        if(qty > 1 ){
            qty= cartProduct.qty;
            qty--;
            let TotalPrice = qty*cartProduct.price; 
            const cartRef = doc(fs,'Cart '+uid,cartProduct.id);
            updateDoc(cartRef,{qty,TotalPrice}).then(()=>{
                cartToggle()
    
                console.log("UPDATED")
            })
        }
        
    }
    const handleDelete = async()=>{
        await deleteDoc(doc(fs,'Cart '+uid,cartProduct.id))
        cartToggle()
    }
    
  return (
    <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text price'>Price: ${cartProduct.price}</div>
            <span>Quantity</span>
            
            <div className='product-text quantity-box'>
                <div className='action-btns minus' >
                    <Icon icon={minus} size={20} onClick={handleDecrement} />
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' >
                    <Icon icon={plus} size={20} onClick={()=>{handleIncrement(cartProduct)}}/>
                </div>
            </div>

            <div className='product-text cart-price'>Total price ${cartProduct.TotalPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleDelete}>DELETE</div>            
        </div>
  )
}
