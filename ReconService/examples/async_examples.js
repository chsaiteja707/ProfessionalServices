//execute the below code in chrome console only

// promise examples
const fistFun=new Promise((resolve,reject)=>{
    resolve('first fun');
})

const secondFun=new Promise((resolve,reject)=>{
    resolve('second fun');
})

const thirdFun=new Promise((resolve,reject)=>{
    resolve('third fun');
})

//Promise.race - with this it will return when the first one is completed instead of waiting for everything to get completee
Promise.all([
    fistFun,
    secondFun,
    thirdFun
]).then(messages=>{
    console.log(messages)
})


// ===========================================
const runTimer=()=>{
    return new Promise((resolve,reject)=>{
        console.log('timer started');
        setTimeout(() => {
            resolve('in timer resolve');
        }, 2000);
    })
}

const openFile=(a)=>{
    var k=new Promise((resolve,reject)=>{
        if(a==='in timer resolve'){
            resolve('file fetching in progress');
        } else {
            reject('file fetching failed');
        }
    })
    return k;
}

//using then
// runTimer()
//     .then(res=>{
//         console.log(res);
//         return openFile(res);
//     })
//     .then(res=>{
//         console.log(res)
//     })
//     .catch(err=>{
//         console.log(err)
//     });

//using async await
const doWork=async ()=>{
    try {
        const resultFromTimer=await runTimer();
        console.log(resultFromTimer);
        const result =await openFile(resultFromTimer);
        console.log(result);
    } catch (error) {
        console.log(error)
    } 
}
doWork();


//another example for async and await
const disp=async()=>{
    var k=new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('in timer')
            resolve('resolved from timer')
        }, 2000);
    })
    return k;
}

const rest=await disp();
console.log(rest);
console.log('hello man')