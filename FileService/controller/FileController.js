var fs=require('fs');
var csv=require('fast-csv');
const path = require('path');

exports.getFileData=(req,res,next)=>{
    // res.send('hai hello');
    var a=[];
    fs.createReadStream(path.resolve(__dirname,'Test.csv'))
        .pipe(csv.parse({headers:true}))
        .on('data',(row)=>{
            a.push({...row})
        })
        .on('end',(rowcount)=>{
            // console.log(rowcount);
            res.send(a);
        })
}