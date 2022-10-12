import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import { Drawer,IconButton,List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

const DrawerComp = () => {
    const dispatch=useDispatch();
    const isLoggedIn=useSelector(state=>state.isLoggedIn);
    const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <React.Fragment>
        <Drawer open = {openDrawer} onClose={()=>setOpenDrawer(false)}>
        { isLoggedIn &&
          <List>
           <ListItemButton component={Link} to='/blogs' onClick={()=>setOpenDrawer(false)}>
             <ListItemIcon>
                 <ListItemText>All Posts</ListItemText>
             </ListItemIcon>
           </ListItemButton>
          </List>
        }
           
        { isLoggedIn &&
           <List>
           <ListItemButton component={Link} to='/myBlogs' onClick={()=>setOpenDrawer(false)}>
             <ListItemIcon>
                 <ListItemText>My Posts</ListItemText>
             </ListItemIcon>
           </ListItemButton>
          </List>
        }

        { isLoggedIn &&
           <List>
           <ListItemButton component={Link} to='/blogs/add' onClick={()=>setOpenDrawer(false)}>
             <ListItemIcon>
                 <ListItemText>Add Posts</ListItemText>
             </ListItemIcon>
           </ListItemButton>
          </List>
        }   
           
        { isLoggedIn &&
          <List>
           <ListItemButton component={Link} to='/auth' onClick={()=> dispatch(authActions.logout()) && setOpenDrawer(false)} >
            <ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItemIcon>
           </ListItemButton>
         </List>
        }

        { !isLoggedIn && 
          <List>
           <ListItemButton component={Link} to='/auth' onClick={()=>setOpenDrawer(false)}>
            <ListItemIcon>
                <ListItemText>Login</ListItemText>
            </ListItemIcon>
           </ListItemButton>
          </List>
        }
           
        { !isLoggedIn && 
           <List>
              <ListItemButton component={Link} to='/auth' onClick={()=>setOpenDrawer(false)}>
                <ListItemIcon>
                    <ListItemText>Signup</ListItemText>
                </ListItemIcon>
              </ListItemButton>
           </List>
        }
           
        </Drawer>
        <IconButton sx={{color: 'white',marginLeft: 'auto'}} onClick={()=>setOpenDrawer(!openDrawer)}>
           <MenuIcon/>
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp