import React from 'react'
import img from '../../assets/teams/7979c40b3eb344fd79e3be5a449402cc.jfif'
import './Project_card.css'
import dots from '../../assets/fields/more.svg'
import { useNavigate } from 'react-router-dom'
import Label from '../label/Label'




const Project_card = ({project}) => {

  const navigate = useNavigate();

  return (
    <div className='project_card ' onClick={()=>{navigate(`/Projects Dashboard/details/${project.id}`)}}>
        <div className='project_card-img'>
            <img src={project.logo} alt=''/>
        </div>
        <div className='project_card-content'>
            <h2>{project.title}</h2>
            <p><Label text={project.status}/> <span className='slash'/> {project.phases_count} Phases <span  className='slash'/> {project.start}</p>

        </div>
        <hr/>
        <div className='project_card-statistics'>
            <h5>Progress : <span>{Math.floor(project.progress)||0}%</span></h5>
            <progress value={Math.floor(project.progress) ||0} max="100"></progress>

            <h5>Deadline :{project.end}</h5>

        </div>

        {/* <img src={dots} alt='dots' style={{position:'absolute', top:'10px', right:'10px'}}/> */}

    </div>
  )
}

export default Project_card