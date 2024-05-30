import React from 'react'
import './No_member.css'
import empty from '../../../assets/teams/No Message illustration.svg'
import Location from '../../../includes/location/Location'
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom';


const No_member = () => {
    return (
        <>
        {/* <Location head='Teams'/> */}
    
        <div className='dashboard__teams-empty'>
            <div className='dashboard__teams-empty_img'>

                  <img src={empty} alt='empty'/> 
           </div>
            <div className='dashboard__teams-empty_content'>

                <h3>No item has created</h3>
                {/* <p>Click to add <Link to='/createmember'>New Member</Link></p> */}

            </div>

        </div>
        </>
     
    
    
     );
}
 
export default No_member;