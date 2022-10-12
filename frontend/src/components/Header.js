import React, { useState } from 'react'
import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, useMediaQuery, useTheme} from '@mui/material';
import { Link } from 'react-router-dom';
import DrawerComp from '../DrawerComp';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';


const Header = () => {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  const [value, setValue] = useState();
  const theme=useTheme();
  console.log(theme);
  const isMatch= useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);

  return <AppBar position='sticky'  sx={{background: 'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(178,30,30,1) 0%, rgba(101,88,74,1) 0%)'}}>
    <Toolbar>
      {
        isMatch ? (
          <>
            <Typography sx={{fontSize:'1.5rem'}}>Trip-Hackr</Typography>
            <DrawerComp/>
          </>
        ) : (
           <>
           <Typography sx={{fontSize:'1.5rem'}}>Trip-Hackr</Typography>

        { isLoggedIn &&
          <Tabs sx={{marginLeft: 'auto' , marginRight: 'auto'}} textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
            <Tab LinkComponent={Link} to='/blogs' label='All Posts'/>
            <Tab LinkComponent={Link} to='/myBlogs' label='My Posts'/>
            <Tab LinkComponent={Link} to='/blogs/add' label='Add Posts'/>
          </Tabs>
        }
            
        { !isLoggedIn && 
        <> 
          <Button LinkComponent={Link} to='/auth' variant='contained' sx={{marginLeft: 'auto',borderRadius: 10}} color='warning'>Login</Button>
          <Button LinkComponent={Link} to='/auth' variant='contained' sx={{marginLeft: 1,borderRadius: 10}} color='warning'>Signup</Button>
        </>
        }
            
        { isLoggedIn &&
              <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to='/auth' variant='contained' sx={{marginLeft: 1,borderRadius: 10}} color='warning'>Logout</Button>
        }
        </>
        )
      }
  
      
     
         
   
    </Toolbar>
  
  </AppBar>
  
}

export default Header