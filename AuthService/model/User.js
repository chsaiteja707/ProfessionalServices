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

    static async createUser(user){
        const db=getDb();
        try{
            const createUser=await db.collection('User')
                .insertOne({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    password:user.password,
                    phoneNumber:user.phoneNumber,
                    email:user.email,
                    address:user.address,
                    gender:user.gender,
                    role:user.role,
                    city:user.city,
                })
            return createUser;
        } catch(err){
            console.log(err);
        }
    }
}
module.exports=User;


