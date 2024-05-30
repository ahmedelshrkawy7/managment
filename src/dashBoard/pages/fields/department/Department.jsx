import React, { useState } from 'react'
import './Department.css'
import FieldCard from '../../../components/fieldCard/FieldCard'
import Location from '../../../includes/location/Location'
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Scroll } from '../../../includes/scrollHorizantly/Scroll'
import { useContext } from 'react'

const Department = () => {


  const nav = useNavigate();

  const scrollRef = Scroll() ;

  const navigate=(id)=>{
    
    nav (`../fields/${id}`);

  }
  const[numDep, setNumDep]=useState(null)

  const depNum =(num)=>{
    setNumDep(num)
  }




  return (
    <>
    
    <Location main='Major' head='Departments' />
    <div className='dash__create'>
      <div className='dash__create-head'>

        <h4 ><span className='blue'>{numDep}</span> Total Specialization are added</h4>
          
      </div>
        {/* <Link to='/specialization' className='dash__create-button'>
          
          <img src={plus} alt='plus'/>
          <h2>Specialization</h2>
        </Link> */}

    </div>
  
    <div className=' grid  grid-cols-3  w-full lg:grid-cols-2  sm:grid-cols-1 gap-8 justify-center '>


      <FieldCard api='departments' num={depNum}  fun={navigate}/>
      
     
    </div>
     
     
     
      
    </>
  )
}

export default Department