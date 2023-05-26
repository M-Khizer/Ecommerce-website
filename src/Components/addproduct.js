import React from 'react'
import {fs,storage} from '../Config/config'


export default function Addproduct() {

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('')  
  const [proce,setPrice] = useState('')  
  const [image,setImage] = useState(null);

  const handleAddProd =()=>{

  }
  
  const handle

  return (
<div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            {/* {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}  */}
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
                
                {/* {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>} */}

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
