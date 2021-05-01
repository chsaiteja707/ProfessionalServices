const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();

const mongoConnect=require('./util/db').mongoConnect;

const authRoutes=require('./routes/AuthRoutes');

const app=express();

app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes);

mongoConnect(()=>{
    console.log('connected to auth db');
    app.listen(process.env.PORT,()=>{
        console.log(process.env.PORT+' - user auth service - is up')
    })
})
