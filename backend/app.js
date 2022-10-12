import express from 'express';
import mongoose from 'mongoose';
import router from '../routes/user-routes.js';
import blogRouter from '../routes/blog-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
 
app.use("/api/user",router);
app.use("/api/blog", blogRouter);



mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(process.env.PORT || 7000))
.then(()=>console.log('connected to database and listening to localhost 7000'))
.catch((err)=>console.log(err));

app.get('*',(req,res)=>{
    res.json('backend start')
})
