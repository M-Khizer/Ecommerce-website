import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import {auth} from '../Config/config'
import{Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { useNavigate } from 'react-router-dom';

export default function Navbars({loginUser,user}) {
  const nav = useNavigate()

  const handleSignOut =()=>{
    signOut(auth).then(()=>{
      nav('/signin')
    })
  }

 return (
    <nav className="navbar navbar-expand navbar-light bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

{!user && (

  <>
    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

  <li className="nav-item">
    <Link className="nav-link" to= "/signin">
      Signin
    </Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/signup">
      Signup
    </Link>
  </li>

  </>)}

  {user && (
    <>
    
      <li className="nav-item">
        <Link className="nav-link" to="#">{user}</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          <Icon icon={shoppingCart} size={20}/>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#" onClick={handleSignOut}>Signout</Link>
      </li>
     
    </>
  )}            
            
           
          </ul>
        </div>
      </div>
    </nav>
    
  )
}
 