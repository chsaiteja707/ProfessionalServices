require('dotenv').config();
const fileRoutes=require('./routes/FileRoutes')

const express=require('express');
const app=express();

app.use(fileRoutes);

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+' - file server- is up')
});