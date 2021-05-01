// const mongoDb=require('mongodb');
const getDb=require('../util/db').getDb;

// class Users{ //in local db name is specified as Users for DB
class User{ //in Mongo Cloud name is specified as User for DB
    constructor(){

    }

    static getUsers(){
        const db=getDb();
        return db.collection('user')//in Mongo Cloud name is specified as User for DB
        .find({},{projection:{'_id':0,'First Name': 1, 'Last Name':1, 'Email':1, ' Email':1}})
        .toArray()
        .then((results)=>{
            return results;
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
module.exports=User;


