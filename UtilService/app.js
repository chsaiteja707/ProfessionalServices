require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const emailRoutes=require('./routes/EmailRoute');
const newsRoutes=require('./routes/NewsRoutes');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use(emailRoutes);
app.use(newsRoutes);

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+' - email - is up')
})