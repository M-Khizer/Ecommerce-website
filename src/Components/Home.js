import React, { useEffect } from 'react'
import Products from './products'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/productsSlice'
import Navbars from './Navbar'
import { getCart } from '../features/cartSlice'

export default function Home() {

  const dispatch=useDispatch();
  const products = useSelector(state=> state.products.products);
  const uid = useSelector(state=>state.user.uid);

  useEffect(()=>{

    dispatch(getProducts())
    dispatch(getCart(uid))  

  },[uid])
  
  return (
    <div>
        <Navbars />
        {products.length > 0 && (
          <div className='container-fluid'>
            <br></br>
            <h1 className='text-center'>Products</h1>
            <div className='products-box'>
            
              <Products/>
            </div>
          </div>
        )}
        {products.length < 1 && (
           <div className='container-fluid'>Please wait .....</div>
        )}
    </div>
  )

        }