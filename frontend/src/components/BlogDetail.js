import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, useTheme } from '@mui/material';
import { InputLabel, Box, TextField, Typography, useMediaQuery } from '@mui/material'


const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});

  const handleChange=(e)=>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:7000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
       
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:7000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/myBlogs/"));
  };

  const theme=useTheme();
  console.log(theme);
  const isMatch= useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {
        isMatch?(
          <>
          {inputs &&
      <form onSubmit={handleSubmit}>
        <Box width={'70%'} height= {'auto'} border={2} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={2} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} >
          <Typography fontWeight={'bold'} padding={2} color='grey' variant='h5' textAlign={'center'} >Update Your Travel Experience</Typography>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'18px',fontWeight:'bold'}}>Name of the place visited</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'18px',fontWeight:'bold'}}>Your Experience</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          
           <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>         
        </Box>
      </form>
        }
          </>
        ):
        (
          <>
      {inputs &&
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor= 'linear-gradient(0deg, rgba(31,121,122,1) 39%, rgba(11,22,85,1) 83%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'40%'}>
          <Typography fontWeight={'bold'} padding={2} color='grey' variant='h4' textAlign={'center'}  >Update Your Travel Experience</Typography>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'20px',fontWeight:'bold'}}>Name of the place visited</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb: 1, mt:2,fontSize:'20px',fontWeight:'bold'}}>Your Experience</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
      }
          </>
        )
      }
        
    </div>
      
     
    )
 
}

export default BlogDetail;
