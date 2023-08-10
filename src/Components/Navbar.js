import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {auth} from '../Config/config'
import{Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {menu} from 'react-icons-kit/feather/menu'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId,getName } from '../features/userSlice';
import { doc,getDoc } from 'firebase/firestore';
import { fs } from '../Config/config';
import image from '../Images/logo.png'

export default function Navbars() {
  
  const dispatch=useDispatch();
  const fullName = useSelector(state=> state.user.fullName)
  const uid = useSelector(state=> state.user.uid);
  const cartItem = useSelector(state=> state.cart.cart);
  const [isOpen,setIsOpen] = useState(false);

  const toggleMenu = ()=>{
    setIsOpen(!isOpen);
  }

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{

      dispatch(getUserId(user.uid))
      
      const docRef= doc(fs,'users',user.uid)
      getDoc(docRef).then(snapshot=>{
        dispatch(getName(snapshot.data().fullName))
      })
    })
  },[uid])

  const nav = useNavigate()
  // console.log(user)

  const handleSignOut =()=>{
    signOut(auth).then(()=>{
      nav('/signin')
    })
  } 

 return (

  <header>
      <Link className='logo' to='/'>
        <img src={image} alt='logo'/> 
      </Link>
      
      <div className='navigation'>
        
        <div className='toggle-menu' onClick={toggleMenu}>
          <Icon icon={menu} size={30} className='ham'/>
        </div>

      <ul className={isOpen ? 'menu' : 'not-visible'}>

      {!uid && (

  <>
    
  <li>
    <Link to= "/signin" className='link'>
      Signin
    </Link>
  </li>

  <li>
    <Link to="/signup" className='link'>
      Signup
    </Link>
  </li>

  </>)}

  {uid && (
    <>

      <li>
        <Link to="#" className='link'>{fullName} </Link>
      </li>

      <li><Link to="/addproducts" className='link'>Add Products</Link></li>

      <li>
        <Link to="/cart">
          <Icon icon={shoppingCart} size={20} className='link '/>
          <sup className='products-indicator'>{cartItem.length}</sup>
        </Link>
      </li>

      <li>
        <Link to="#" onClick={handleSignOut} className='action-btns'>Signout</Link>
      </li>
     
    </>
  )}  
    
      </ul>

      
      </div>
      
  </header>
  )
}
 