import React, {  useEffect, useRef, useState } from 'react'
import case1 from '../../assets/Form/briefcase.svg'
import bin from '../../assets/Form/fluent_delete-28-regular.svg'
import plus from '../../assets/Form/icons.svg'
import useAxios, { Axios } from '../../api/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { notify,error } from '../../notifications/Toast'
import Location from '../location/Location'
import Header from '../../components/Header/Header'
import { Input } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'




const Addform = ({header,placeholder, api ,arrName}) => {

  const navigate = useNavigate();
  let [title,setTitle] =useState([]) ;
  let [disabled,setDisabled] =useState(false) ;
  const {postData} =useAxios();
  
   

   let linkinput = useRef(0);
   
   let submitBtn = useRef(0);

   
  
   

 
   
   let pushLink=()=>{

    
      if(linkinput.current.value !==''){

       setTitle([...title,  linkinput.current.value ]);
      }
      linkinput.current.value='';
    }
      
       



   let removeLink=(index1)=>{
      setTitle(title.filter(( word ,index)=>{return (index1 !== index)}))
   }
   
   
   
   
    
   const handleSubmit= async()=>{

       console.log(title.length)

       if (title.length !== 0){
       setDisabled(true)     


      // await Axios({
      //   method: "post",
      //   url:  `/${api}`,
      //   data: { [arrName] : title } ,
      //   headers: { "Content-Type": "multipart/form-data" },
      // })

      await postData([ `/${api}`,{ [arrName] : title }])
        .then(function () {
          notify(`${arrName} added successfully`);

        })
        .catch(function (response) {
          error(response.response.data.message)
        }).finally(()=>{
          setDisabled(false)     
          setTitle([]);
        })
     }
  
      
   }

   useEffect(()=>{
    setTitle([]);
   },[header])





   
  return (
    <>

    <Header text={header}/>

    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New {header}</p>
      </div>

      <form>
      
        
        <div className='dash__form-content'>
          
          <div className='dash__form-content_details grid grid-cols-4'>

            <div>
              <p>{header}</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <Input  ref={linkinput} placeholder={placeholder} />
                <div className='addLink' onClick={pushLink}   ><img src={plus} alt='addlink'/></div>
               { ! !!title.length && <span className='error'> required </span>}
              </div>
            </div>

          </div>

            <section className='grid grid-cols-4 gap-4 w-full' >

            {title.map((link , index1)=>{
              
              return(
              <div className='dash__form-content_links-link' style={{width:'100%'}}>

              <div className='dash__form-content_links-link-a' style={{width:'165px'}}>
                <a href={link} target='blank'>{link}</a>
              </div>
              <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1)}}>
                  <img src={bin} alt='bin'/>
                </div>

          </div>
              )

            })}

            
            </section>
          
            

        </div>
        <input type='submit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}/>
      </form>
    
    <div className='dash__form-confirm'>
     <Link disabled={disabled} type='button'   onClick={()=>{handleSubmit()}} >{disabled ?   <Spinner size='md' />
   :'Create' } </Link> 
      <Link hidden>Back</Link>
      
    </div>
  </div>


  
  </>
  )
}

export default Addform