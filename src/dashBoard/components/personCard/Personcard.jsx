import React from 'react'
import './Personcard.css'
import user from '../../assets/fields/Imagem.png'
import { Link } from 'react-router-dom'
import defimg  from "../../assets/Form/solar_camera-linear.svg"

const Personcard = ({name,experience,position,image,id}) => {
  console.log(id)
  console.log(image)
  return (
    <div className='personcard'>
      <div className='personcard_img'>
          <img src={image ? image :defimg} alt='user'/>
      </div>
      <div className='personcard_content'>
        <div>
          <h6>{name}</h6>
        </div>
        <div>
          <p>Experience : </p>
          <h5>{experience}</h5>
        </div>
        <div>
          <p>Position :</p>
          <h5> {position}</h5>
        </div>
      </div>
      <div className='personcard_button'>
          <Link to={`/assignTask/${id}/${name}`} >Assign New Task</Link>
      </div>

    </div>
  )
}

export default Personcard