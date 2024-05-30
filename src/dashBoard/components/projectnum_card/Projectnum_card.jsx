import React from 'react'
import './Projectnum_card.css'
import { useNavigate } from 'react-router-dom'

const Projectnum_card = ({header,num,icon,footer,nav}) => {
  const navigate = useNavigate()
   

  return (
    <div className='projectnum_card ' onClick={()=>{navigate(`${nav}`)}}  >
        <div className='projectnum_card-content'>
            <p>{header}</p>
            <h4><span> {num} </span>{footer}</h4>
        </div>
        <div className='projectnum_card-img'>
            <img src={icon} alt='icon'/>
        </div>
        
    </div>
  )
}

export default Projectnum_card