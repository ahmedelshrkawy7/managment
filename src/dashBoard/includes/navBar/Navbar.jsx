import React, { useContext, useEffect, useState } from 'react'
import user from '../../assets/Ellipse 3247.svg'
import './Navbar.css'
import logout from '../../assets/nav/logout.svg'
import { useNavigate } from 'react-router-dom'
import { error } from '../../notifications/Toast'
import Cookies from 'js-cookie'
import { MenuButton,MenuList,MenuItem,IconButton,Menu,MenuGroup,MenuDivider } from '@chakra-ui/react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import AuthContext from '../../Auth/AuthProvider'



const Navbar = () => {

   const Navigate = useNavigate()
   const{setAuth,Auth}= useContext(AuthContext)

    const [user,setUser]= useState({})
    const [dark,setDark]= useState("light")

    useEffect(()=>{
      // setUser(localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):{})
      document.querySelector(':root').setAttribute('color-scheme', 'light');
    },[])



    
 const toggleMode=()=>{

  const root = document.querySelector(':root')

  if(dark ==='dark'){
   setDark('light')
   root.setAttribute('color-scheme', 'light')
 }
  else{
    setDark('dark')
    root.setAttribute('color-scheme', 'dark')
  }

  
 }

  return (
    <div className='dash__nav'>
      <div className='dash__nav-title'><h1 className='text-4xl '>Dashboard</h1></div>
      <div className='dash__nav-content'>
         
        <Menu className="hidden " >
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<GiHamburgerMenu color="var(--blue)" size={25} />}
          variant='outline'
        />
       <MenuList>
    <MenuGroup title='Account'>
      <MenuItem > <div className=' dash__nav-content-user  ' style={{display:'flex'}}>
            <img src={user?.user?.image} alt=''/>
            <div className='dash__nav-content-user-name'>
              <h3>{user?.user?.name}</h3>
              <p>{user?.user?.email}</p>
            </div>
         </div></MenuItem>
      
    </MenuGroup>
    <MenuDivider />
   
      <MenuItem icon={<CiLogout size={25} />}>Log Out</MenuItem>
    
   
  </MenuList>
          </Menu>
{/*           
          <div >
              <label className="toggle" for="switch">
                  <input id="switch" className="input" type="checkbox" onChange={toggleMode} hidden/>
                  <div className="icon icon--moon">
                  <svg height="24" width="24" fill="var(--blue)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                      </svg>
                  </div>
              
                  <div class="icon icon--sun">
                      
                      <svg height="24" width="24" fill="var(--blue)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path clip-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fill-rule="evenodd"></path>
                      </svg>
                  </div>
              </label>
          </div>           */}
         <div className=' dash__nav-content-user '>
            <img src={user?.user?.image} alt=''/>
            <div className='dash__nav-content-user-name'>
              <h3>{Auth?.user?.name}</h3>
              <p>{Auth?.user?.email}</p>
            </div>
         </div>


         <div className='dash__nav-content-bell ' onClick={()=>{
            localStorage.setItem('logged', false);
            localStorage.removeItem('token')
            setAuth(false)
            
            Navigate('/login');
            error('Logged Out')
           
         }}>
            <img  src={logout} alt='logout'/>
        </div> 
        </div>
      </div>

  )
}

export default Navbar