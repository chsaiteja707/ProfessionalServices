// const mongoDB=require('mongodb');
const getDb=require('../util/db').getDb;

class Login{
    
    constructor(){}

    static async findUserByUserId(userId){
        const db=getDb();
        try {
            const result=await db.collection('Login').findOne({userId:userId})
            return result;
        } catch (error) {
            return '400';
        }
    }
}

module.exports=Login;