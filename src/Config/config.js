import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDxUAB3gbgtt9dt18LR3B1SQCpL6LMWB3Q",
    authDomain: "ecommerce-30138.firebaseapp.com",
    projectId: "ecommerce-30138",
    storageBucket: "ecommerce-30138.appspot.com",
    messagingSenderId: "421312479410",
    appId: "1:421312479410:web:9d46d4e81f03bdcab049ab"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const fs = getFirestore(app);
  const storage = getStorage();
    
export {auth,fs,storage}