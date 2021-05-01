const emailRoutes=require('./routes/EmailRoute');
require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use(emailRoutes);

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+' - email - is up')
})