const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const app=express();

const mongoConnect=require('./util/db').mongoConnect;
const dbRoutes=require('./routes/dbRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use(dbRoutes);


mongoConnect(()=>{
    console.log('connected to db');
    app.listen(process.env.PORT,()=>{
        console.log(process.env.PORT+' - db server - is up')
    });
})


