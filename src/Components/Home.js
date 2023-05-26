import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc,doc } from 'firebase/firestore'
import {fs,auth} from '../Config/config'

export default function Home() {

  const [user,setUser]=useState(null)
  
  useEffect(() => {

    const unsubscribe=onAuthStateChanged(auth,user=>{
      if(user){
        const docRef= doc(fs,'users',user.uid)
        const docSnap = getDoc(docRef).then(snapshot=>{
          setUser(snapshot.data().fullName);
        })

      }
      else{
        setUser(null)
      }
    })
  
    console.log(user)
    return () => {
      unsubscribe();
    }
  }, [])
  

  
  console.log(user)
  
  return (
    <div>
        <Navbar user={user}/>
    </div>
  )
}
