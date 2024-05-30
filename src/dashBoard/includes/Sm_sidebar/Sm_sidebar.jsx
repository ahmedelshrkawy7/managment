import React from 'react'
import{ icon1,icon2,icon3,icon4,icon5,icon6 ,icon7,icon8,arrowR} from '../sideBar/imports'
import './Sm_sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sm_sidebar = ({toggle,side}) => {

  let arr =[{img: icon1 , p:'Home' ,nav:'/'},
  {img:icon4 , p:'Fields',nav:"/deplist"},
  {img:icon5, p:'Teams',nav:'/teamlist'},
  {img: icon2 , p:'Projects',nav:'/project list' },
  {img: icon8 , p:'Projects Management ',nav:"/Projects Dashboard"},
  {img:icon3 , p:'Tasks',nav:'/Tasks List'},
  {img:icon6 , p:'Settings',nav:'/Settings'}]


  const navigate = useNavigate()
  return (
    <div className={`sm_sidebar ${side?'hide':''}`} >
           

        <div className='sm_sidebar-container' >
           <div className='arrow' onClick={toggle}><img src={arrowR} alt='arrow'/></div>

     {   arr.map((icon)=>{
            return(
                <div tabIndex={1} className='sm_sidebar-icon' onClick={()=>{navigate(`${icon.nav}`)}}>

                        <img src={icon.img} alt='icon'/>
                        <div class="tooltiptext">{icon.p}</div>

                </div>
            )
        })
}
        </div>



    </div>
  )
}

export default Sm_sidebar