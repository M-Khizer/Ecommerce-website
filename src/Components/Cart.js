import React, { useEffect, useState } from 'react'
import Navbars from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../features/cartSlice'
import CartProducts from './CartProducts'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { collection, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import { fs } from '../Config/config'

export default function Cart() {

    const dispatch = useDispatch()
    const cartItem = useSelector(state=>state.cart.cart)
    const uid = useSelector(state=>state.user.uid)
    const [toggle,setToggle]=useState(false);
    const qty =  cartItem.map(item=>{return item.qty})
    
    const productReducer = (accumulator,currentValue)=>accumulator+currentValue;
    const qtySum = qty.reduce(productReducer,0);
    
    const getPrices = cartItem.map(item=>{ return item.TotalPrice})
    const priceReducer = (accumulator,currentValue)=>accumulator+currentValue;
    const priceSum = getPrices.reduce(priceReducer,0);

    const cartToggle = ()=>{
        setToggle(!toggle);
    }
    

    useEffect(()=>{
        dispatch(getCart(uid));
        console.log('useefet')
        
    },[toggle,uid])
    
    const handleToken = async(token)=>{
        //  console.log(token);
    
        const cart = {name: 'All Products', priceSum}
        const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
        console.log(response);
        let {status}=response.data;
        console.log(status);
        if(status==='success'){
            // nav('/');
            toast.success('Your order has been placed successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });

            const res = await getDocs(collection(fs,'Cart '+uid))
            res.docs.map(doc=>{
                deleteDoc(doc(fs,'Cart '+uid,doc.id))
            })

        }
        else{
            alert('Something went wrong in checkout');
        }
     }

    return (
        
    <div>
        <Navbars/>
        <br></br>        
        {cartItem.length > 0 && 
            <div className='container-fluid'>
                <h1 className='text-center'>Cart</h1>
                <div className='products-box'>
                    <CartProducts cartToggle={cartToggle} />
                </div>

                <div className='summary-box'>
                    <h2>Cart Summary</h2>
                    <div className='cart-info'>

                        <div className='cart-box'>
                        <span>Total number of products</span>
                            <span>{qtySum}</span>
                        </div>
                        <div className='cart-box'>
                            <span>Total price to pay</span>
                            <span>${priceSum}</span>

                        </div>
                        <div className='stripe-container'>
                            <StripeCheckout 
                            className='stripe'
                            stripeKey='pk_test_51NJAFkKcykqYdXXWSkBlwa8he6s7KBzmRSVPUggcWnKMON7FzDnHJUcUzOfWdTbZJtMNIFYr9tncYWtSDlCd1wEP00GRjLnePO'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All products'
                            amount={priceSum*100}
                            />
                        </div>
                    </div>
                </div>
            </div>
}
        {cartItem.length < 1 && (
            <div className='container-fluid'>No products in cart </div>
        )}
    </div>
  )
}
