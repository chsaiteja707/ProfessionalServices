const mongoDb=require('mongodb');
const getDb=require('../util/db').getDb;

// class Users{ //in local db name is specified as Users for DB
class User{ //in Mongo Cloud name is specified as User for DB
    constructor(){
        
    }

    static async getUsersByUserId(userId){
        const db=getDb();
        try {
            const getUser= await db.collection('Login').findOne({userId:userId})//in Mongo Cloud name is specified as User for DB
            return getUser;
        } catch (error) {
            console.log(err);
        }   
    }
}
module.exports=User;


