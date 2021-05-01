const express=require('express');
require('dotenv').config();
const app=express();

const mongoConnect=require('./util/db').mongoConnect;
const dbRoutes=require('./routes/dbRoutes');

app.use(dbRoutes);

mongoConnect(()=>{
    console.log('connected to db');
    app.listen(process.env.PORT,()=>{
        console.log(process.env.PORT+' - db server - is up')
    });
})


