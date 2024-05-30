import React, { useContext, useState } from 'react'
import './Loader.css'
import { IoMdClose } from "react-icons/io";
import LoadContext from './LoaderContext';


const Loader = () => {

  const {setLoader} = useContext(LoadContext)


 

  return (
  <>
    <div className='dash_loader'>
        
        
        <div class="loader"></div>

        <IoMdClose size={27} style={{position:'absolute', top:'20px' , right:'20px' }} onClick={()=>{setLoader(false)}}/>

    </div>

  </>
  )
}

export default Loader