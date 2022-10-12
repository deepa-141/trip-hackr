import { Typography, Box, TextField, Button, useTheme, useMediaQuery } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux';

import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:7000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };

    const theme=useTheme();
    console.log(theme);
    const isMatch= useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {
         isMatch?(
          <>
             <form onSubmit={handleSubmit} >
        <Box maxWidth={200} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow='10px 10px 20px 20px #ccc' padding={3} margin='auto' marginTop={8} borderRadius={5} border={4} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)'>
          <Typography variant='h4' padding={1} textAlign='center'>
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          { isSignup &&
            <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>
          }
          <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin='normal'/>
          <TextField name='password' onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password' margin='normal'/>
          <Button type='submit' variant='contained' sx={{borderRadius: 3, marginTop: 3}} color='warning'>Submit</Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius: 3, marginTop: 1}}>Change To {isSignup ? 'Login' : 'Signup'}</Button>
        </Box>
      </form>
          </>

         ):(
          <>
        <form onSubmit={handleSubmit} >
        <Box width='40%' display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow='10px 10px 20px 20px #ccc' padding={3} margin='auto' marginTop={10} borderRadius={5} border={4} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)' >
          <Typography variant='h4' padding={1} textAlign='center'>
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          { isSignup &&
            <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>
          }
          <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin='normal'/>
          <TextField name='password' onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password' margin='normal'/>
          <Button type='submit' variant='contained' sx={{borderRadius: 3, marginTop: 3}} color='warning'>Submit</Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius: 3, marginTop: 1}}>Change To {isSignup ? 'Login' : 'Signup'}</Button>
        </Box>
      </form>
          </>
         )
      }
     
    </div>
  )
}

export default Auth