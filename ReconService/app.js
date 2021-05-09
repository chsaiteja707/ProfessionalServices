const testController=require('./controller/DBAndCSVRecon')
const ReconRoutes=require('./routes/ReconciliationRoutes');
require('dotenv').config();
const express=require('express');
const cors=require('cors');

const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors()); 

app.use(ReconRoutes);

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+' - recon - is up')
});