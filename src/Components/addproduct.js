import React, { useEffect } from 'react'
import {auth,fs,storage} from '../Config/config'
import { useState } from 'react';
import { addDoc,collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../features/productsSlice';
export default function Addproduct() {

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('')  
  const [price,setPrice] = useState('')  
  const [image,setImage] = useState(null);
  const [imageError,setImageError]=useState('')
  const [productError,setProductError]=useState('');
  const [successMsg,setSuccessMsg]=useState('');
  
  const productId = useSelector(state=>state.products.id)
  console.log(productId)

  const dispatch = useDispatch();
  
  const nav = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(!user){
                nav('/signin')
            }
        })
    })

  const handleAddProd =(e)=>{
    e.preventDefault();
    console.log(title,price,description)
    console.log(image)

    const imageName= `products/${image.name}${v4()}`;

    const uploadTask=ref(storage,imageName);
    
    uploadBytes(uploadTask,image).then(snapshot=>{
        console.log('uploaded',snapshot)

        getDownloadURL(ref(storage,imageName)).then(url=>{

            let product = {title,description,price:Number(price),url}

            dispatch(addProducts(product))
            .then(()=>{
                setSuccessMsg('Succesfully added');
                setTimeout(() => {
                    setSuccessMsg('');
                    nav('/')
                }, 3000);
                
            }).catch(error=>{
                setProductError(error.message)
            })
        })

    })
    
  }
  
  const handleProductImg=(e)=>{
    
    const types=['image/jpg','image/png','image/jpeg','image/PNG']
    let selectedfile= e.target.files[0];
    if(selectedfile){
        if(selectedfile&&types.includes(selectedfile.type)){
            setImage(selectedfile);
            setImageError('')

        }
        else{
            setImage(null)
            setImageError('please select a valid image type file')
        }
    }
    else{
        setImageError('please select your file');
    }
  }

  return (
<div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProd}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                onChange={e=>{setTitle(e.target.value)}}></input>
                <br></br>

                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={e=>{setDescription(e.target.value)}}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                onChange={e=>{setPrice(e.target.value)}}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}

                <br></br>           
                
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>

            {/* {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>} */}

        </div>  )
}
