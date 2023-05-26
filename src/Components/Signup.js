import React, { useEffect } from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { addDoc,collection,doc,setDoc } from 'firebase/firestore';
import Navbars from './Navbar';
import {auth,fs} from '../Config/config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [successMessage,setSuccessMessage]=useState('');
    const [errorMessage,setErrorMessage]=useState('');

    const nav = useNavigate();

    const handleSignUp = (e) => {
      e.preventDefault();
      console.log(`Email: ${email}, Password: ${password}`);
      createUserWithEmailAndPassword(auth,email,password).then(userCred=>{
       const newUser = {fullName,email,password}
       setDoc(doc(fs,"users",userCred.user.uid),{...newUser}) 
       .then(()=>{
        setSuccessMessage('Signed up successfully');
        setErrorMessage('');
        setTimeout(() => {
          nav('/signin');
        }, 3000);
       })
      })
      .catch(error=>{
          setErrorMessage(error.message)
      })
    };

  return (
<>
    {/* <Navbars/> */}

    <div className="container">
        <br></br>
        <br></br>

        
      <h1 className="text-center mb-5">Sign up</h1>
          
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSignUp}>
          
          {successMessage && 
        <>
          <div className='success-msg'>{successMessage}</div>
        </>}

          <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="confirm-password"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           
            <button type="submit" className="btn btn-primary w-100">
              Sign up
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
  );
}


