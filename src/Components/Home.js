import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { getDocs,doc, collection,getDoc } from 'firebase/firestore'
import {fs,auth} from '../Config/config'
import Products from './products'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getName,getUserId } from '../features/userSlice'
import { getProducts } from '../features/productsSlice'

export default function Home() {

  const [user,setUser]=useState(null)
  const [userId,setUserId]=useState(null)
  const nav= useNavigate()
  const dispatch=useDispatch();
  
  useEffect(() => {

    onAuthStateChanged(auth,user=>{
      
      if(user){
        dispatch(getUserId(user.uid))
        const docRef= doc(fs,'users',user.uid)
        getDoc(docRef).then(snapshot=>{
          console.log(snapshot.data().fullName)
          // setUser(snapshot.data().fullName);
          dispatch(getName(snapshot.data().fullName))
        })

      }
      else{
        setUser(null)
      }
      if(!user){
        nav('/signin')
      }
    })

  }, [])

  console.log(user)

  // const [products,setProducts]=useState([]);

  const products = useSelector(state=> state.products.products);
  
  useEffect(()=>{

    dispatch(getProducts())
    // getProducts()

  },[dispatch])
  

  return (
    <div>
        <Navbar/>
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