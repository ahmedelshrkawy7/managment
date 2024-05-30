import React from 'react'
import './Label.css'

const Label = ({text,active}) => {

  let color , back , backactive;

  switch(text){
    case 'Completed':
      color = '#000';
      back='rgb(33, 189, 30)'
      backactive='rgb(33, 189, 30)'
      

    break;
    case 'medium':
      color = '#000';
      back='#04D3001A'
      backactive='#04D3001A'
    break;
    case 'In Progress':
      color = '#000';
      back='var(--blue)'
      backactive= "#fff"
    break;
    case 'Delayed':
      color = '#000';
      back='rgb(242, 64, 64)'
      backactive='rgb(242, 64, 64)'
    break;

     default:;
  }

  
  return (
    <div className='label' >
        <span className='w-4 h-4 rounded-full' style={active?{backgroundColor:backactive}:{backgroundColor:back}}/>
        <h2 style={{color:color}}>{text}</h2>
    </div>
  )
}

export default Label