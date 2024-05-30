import React, { useContext, useEffect, useState } from 'react';
import './Setting.css'
import Location from '../../includes/location/Location';
import Addform from '../../includes/Addform/Addform'
import Createsub from '../fields/subDepartment/CreateSub';
import CreateTechnology from '../fields/technology/CreateTechnology';
import Addinput from '../../components/Addinput/Addinput';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import LoadContext from '../../components/loader/LoaderContext';
import { notify , error } from '../../notifications/Toast';


const Settings = () => {

   

    const [settings, setSettings] = useState()
    const [sub, setSub] = useState(false)
    const [tech, setTech] = useState(false)
    const [active, setActive] = useState([])
    const {setLoader} = useContext(LoadContext)

    

   



    
    const reset=(index)=>{
        setSettings()
        setSub(false)
        setTech(false)
        let arr =[]
        arr[index]=1
        setActive([...arr])
    }


    return ( 
        <div className='dash__settings'>
        <Location main='Dashboard' head='Settings' />
        <div className='dash__buttons '>
          
            <div className={active[0]?'active':''}  onClick={()=>{reset(0);setSettings(['position', 'junior','positions','title']);}}>Add Position</div>
            <div className={active[1]?'active':''} onClick={()=>{reset(1);setSettings(['Work Type', 'Onsite','worktypes','type']);}}>Add Work Type</div>
            <div className={active[2]?'active':''} onClick={()=>{reset(2);setSettings(['Gender', 'Male','genders','gender']);}}>Add Gender</div>
            <div className={active[3]?'active':''}  onClick={()=>{reset(3);setSettings(['Currency', 'EGP','currencies','currency']);}}>Add Currency</div>
            <div className={active[6]?'active':''}  onClick={()=>{reset(6);setSettings(['Governorate', 'Cairo','governments','government']);}}>Add Governorate</div>
            {/* <div className={active[4]?'active':''}  onClick={()=>{reset(4);setSub(true)}}>Add Specialization</div>
            <div className={active[5]?'active':''}   onClick={()=>{reset(5);setTech(true)}}>Add Technology</div> */}

        </div>



        {settings &&  <> <Addform header={settings[0]}  placeholder ={settings[1]} api={settings[2]} arrName={settings[3]} />
                      

        </>
                        
        }

                  { sub &&<Createsub/>}  
                  { tech && <CreateTechnology/>}   


      
        </div>
   
    );
}
 
export default Settings;


