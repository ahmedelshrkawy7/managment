import React, {  useRef,useEffect,useContext, useState} from 'react';
import Location from '../../../includes/location/Location';
import case1 from '../../../assets/Form/briefcase.svg'
import { Link, useLocation, useParams } from 'react-router-dom';
import attach from '../../../assets/fields/Attach.png'
import plus from '../../../assets/fields/Plus Math.png'
import document from '../../../assets/fields/document-text.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import download from '../../../assets/fields/import.svg'

import word from '../../../assets/Form/svgexport-18 1.svg'
import  pdf  from '../../../assets/Form/svgexport-10 (18) 1.svg'
import rar  from '../../../assets/Form/svgexport-6 (2) 1.svg'
import useAxios, { Axios } from '../../../api/Axios';
import LoadContext from '../../../components/loader/LoaderContext';
import View_attachments from '../../../components/view_attachments/View_attachments';

const Employeeview = () => {


    let submitBtn = useRef(0);
    const{id}=useParams();
    const{setLoader}= useContext(LoadContext)
    const location = useLocation()


    const[project,setProject] = useState(location.state);
    const {getData,postData}= useAxios()



  


 let string = [];


    project?.technologies?.map((tech)=>{

        string.push(tech.name + ' , ')

        
    })




    const fetchPost = async () => {
        try {
          await 
        //   Axios({
        //     method: "Get",
        //      url: ,
        //   })
        getData(`/projects/${id}`)
          .then((res)=> {setProject(res?.project)});
    
         
        } catch (err) {
          console.log(err);
        }

        finally{
            setLoader(false)

        }
      };
    
    //   useEffect(()=>{
    //     fetchPost();
    //     setLoader(true)
    //   },[])
  


//  for(technology of project?.technologies){
//     console.log("🚀 ~ file: View_project.jsx:48 ~ technology:", technology)
//     } 
    

    const items=[
                    {name:'First Name',data:project.first_name},{name:'Last Name',data: project.last_name},
                    {name:' Position ',data:project.position},{name:'Department ',data:project.departments[0]?.title},
                    {name:'Specialization',data:project.subdepartments[0].title},{name:'Technologies' , data: [...string] },
                    {name:'Experience',data:project.experience},{name:'Governorate' , data: project.governorate },
                    {name:'Adress',data:project.address},{name:'Gender' , data: project?.gender[0]?.gender },
                ]
    const personal=[
                    {name:'Work Hours',data:project.workhours},/*{name:'Work Type',data: project.type},*/
                    {name:' Salary ',data:project.salary},{name:'Phone Number ',data:project.mobile[0]},
                    {name:'Email',data:project.email}
                ]
    
    
    return ( 
        <>
        <Location main='Team List' head={`${project.first_name}${project.last_name}`}/>
        <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Member Information</p>
      </div>
      <form>
        
        <div className='dash__viewtask' >


            <div className='dash__viewtask-img'>
              <img src={project.image} alt='title'/>
            </div>

            <div className='dash__viewtask-information'>
                <h2 className="head">General Information :</h2>
                <div className='grid grid-cols-3 w-full bold'>
                    {
                        items.map((item)=>{
                            return(
                            <div className='flex gap-2 justify-start w-full'>
                                <h3>{item.name}&nbsp;:</h3>
                                <p>&nbsp;{item.data}</p>
                            </div>
                            )
                        })
                    }

                </div>
            </div>
            
            {/* <div className='dash__viewtask-attachments'>




                 <View_attachments links={project?.links} attachs={project?.attachments}/>

                
            </div> */}

           
            <div className='dash__viewtask-information'>
                <h2 className="head">Personal Information :</h2>
                <div className='grid grid-cols-3 w-full bold'>
                    {
                        personal.map((item)=>{
                            return(
                            <div className='flex gap-2 justify-start w-full'>
                                <h3>{item.name}&nbsp;:</h3>
                                <p>&nbsp;{item.data}</p>
                            </div>
                            )
                        })
                    }

                </div>
            
            </div>

        </div> 
        
       
         <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
      </form>
      
      <div className='dash__form-confirm'>
        <Link  hidden type='submit' /*onClick={()=>{handleSubmit()}}*/ > create </Link> 
        <Link to='/teamlist'> Back </Link>
        
      </div>
        </div>

   
    </>
    );
}
 
export default Employeeview;