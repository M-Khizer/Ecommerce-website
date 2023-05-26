import React from 'react'
import { signOut } from 'firebase/auth'
import {auth} from '../Config/config'

export default function Signout() { 
            
 return (
    <div>
        <button>Logout</button>
    </div>
  )
}
