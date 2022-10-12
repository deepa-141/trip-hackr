import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, useMediaQuery,useTheme } from '@mui/material'
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title, description, imageURL, userName, isUser ,id}) => {
    const navigate = useNavigate();
    
    const handleEdit = (e) => {
      navigate(`/myBlogs/${id}`);
    };

    const deleteRequest = async () => {
      const res = await axios 
        .delete(`http://localhost:7000/api/blog/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = () => {
      deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"));
    };
    
    const theme=useTheme();
    console.log(theme);
    const isMatch= useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
    {
        isMatch?(
        <>
        <Card  sx={{width:'80%', height: 'auto', margin:'auto',mt:3, mb:8, padding:2, boxShadow: '5px 5px 10px #ccc',  border: '2px solid black', ':hover':
        { boxShadow:  '10px 10px 20px #ccc'}}  }>
        
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}><ModeEditIcon color='warning'/></IconButton>
            <IconButton onClick={handleDelete}><DeleteForeverIcon color='error'/></IconButton>
          </Box>
        )}

       <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red'}} aria-label="recipe">
            {userName ? userName.charAt(0) : ""}
          </Avatar>
        }
        
        title={title}
       />
      
      <CardMedia
        component="img"
        height="130"
        image={imageURL}
        alt="Paella dish"
      />
      
      <CardContent >
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary" height='auto'>
          <b>{userName}</b> {": "} {description}
        </Typography>
      </CardContent>

      </Card>
               
    </>
    ):
        

    (
        <>
        <Card  sx={{width:'60%', margin:'auto',mt:3, mb:8, padding:1, boxShadow: '10px 10px 20px #ccc',  border: '2px solid black', ':hover':
        { boxShadow:  '20px 20px 10px #ccc'}}}>

        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}><ModeEditIcon color='warning'/></IconButton>
            <IconButton onClick={handleDelete}><DeleteForeverIcon color='error'/></IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
          <Avatar sx={{ bgcolor: 'red'}} aria-label="recipe">
            {userName ? userName.charAt(0) : ""}
          </Avatar>
          }
        title={title}
        />
      
       <CardMedia
         component="img"
         height="350"
         image={imageURL}
         alt="Paella dish"
       />

      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
         <b>{userName}</b> {": "} {description}
        </Typography>
      </CardContent>

       </Card>
    </>
    )
    }
    
    </div>
  )
}

export default Blog;