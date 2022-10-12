import { Button, useTheme } from '@mui/material';
import { InputLabel, Box, TextField, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange=(e)=>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendRequest=async()=>{
    const res=await axios.post('http://localhost:7000/api/blog/add',{
      title : inputs.title,
      description : inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem('userId')
    }).catch(err => console.log(err));
    const data=await res.data;
    return data;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(() => navigate("/blogs"));
  }

  const theme=useTheme();
  console.log(theme);
  const isMatch= useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <div>
    {
        isMatch?(
          <>
      <form onSubmit={handleSubmit}>
        <Box width={'70%'} height= {'auto'} border={2} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={2} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} >
          <Typography fontWeight={'bold'} padding={2} color='grey' variant='h5' textAlign={'center'}  >Share Your Travel experience</Typography>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'18px',fontWeight:'bold'}}>Name of the place visited</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'18px',fontWeight:'bold'}}>Your Experience</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'18px',fontWeight:'bold'}}>ImageUrl</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL } margin='auto' variant='outlined'/> 
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>         
        </Box>
      </form>
          </>
        ):
        (
          <>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'40%'}>
          <Typography fontWeight={'bold'} padding={2} color='grey' variant='h4' textAlign={'center'}  >Share Your Travel experience</Typography>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'20px',fontWeight:'bold'}}>Name of the place visited</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'20px',fontWeight:'bold'}}>Your Experience</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'20px',fontWeight:'bold'}}>ImageUrl</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant='outlined'/> 
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
          </>
        )
    }
      
  </div>
    
   
  )
}

export default AddBlog