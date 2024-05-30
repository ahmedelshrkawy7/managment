
import React,{useState} from 'react'

const Specialcard = () => {

  let [departments , setDepartments] =useState({
    backend: ['.net','php'],
    frontend:['react','angular']
  });


  return (
    <>
    {Object.keys(departments).map((dep)=>{
      return(
      <div >
        <h5>{dep}</h5>

            
          {departments[dep].map((link , index1)=>{
            
            return(
        <div className='dash__form-content_links-link' style={{width:'100%'}}>

            <div className='dash__form-content_links-link-a' style={{width:'165px'}}>
             {link}
            </div>
            {/* <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1)}}>
                <img src={bin} alt='bin'/>
              </div> */}

        </div>
            )

      })}

      </div>)
     })

     }
     </>
  )
}

export default Specialcard