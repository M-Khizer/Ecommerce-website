import React from 'react'
import { useState,useEffect } from 'react';
import { signInWithEmailAndPassword,onAuthStateChanged,signOut } from 'firebase/auth';
import Navbars from './Navbar';
import {auth} from '../Config/config'
import { useNavigate } from 'react-router-dom';
export default function Signin() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginUser,setLoginUser]=useState()
    const [successMessage,setSuccessMessage]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const nav = useNavigate();
      
    const handleSubmit = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth,loginEmail,loginPassword).then(userCred=>{
        console.log(userCred)
      })
      .then(()=>{
        setSuccessMessage('Signed up successfully');
        setErrorMessage('');
        setTimeout(() => {
          nav('/');
        }, 3000);
       }).catch(e=>{
        setErrorMessage(e.message)
       })
    };
      
return (
<>
{/* <Navbars loginUser={loginUser} /> */}

<div className="container">
    
        <br></br>
        <br></br>

      <h1 className="text-center mb-5">Sign In</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            {successMessage && 
        <>
          <div className='success-msg'>{successMessage}</div>
        </>}

              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>

            {errorMessage && 
        <>
          <div className='error-msg'>{errorMessage}</div>
        </>}

          </form>
        </div>
      </div>
    </div>  
    </>
    )
}
