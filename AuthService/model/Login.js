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

    static async createUser(user){
        const db=getDb();
        try {
            const result=await db.collection('Login').insertOne({userId:user.userId,password:user.password})
            return result;
        } catch (error) {
            return '400';
        }
    }

    static async addPasswordOTP(user){
        const db=getDb();
        try {
            const result=await db.collection('Login').updateOne({userId:user.userId},{$set:{otp:user.OTP,generated:user.generated}})
            return result;
        } catch (error) {
            return '400';
        }
    }

    static async getOTPforValidation(userId){
        const db=getDb();
        try {
            //key point here, it has to be either inclusion with _id or exclusion with _id but not both
            //https://stackoverflow.com/questions/24949544/mongodb-cant-canonicalize-query-badvalue-projection-cannot-have-a-mix-of-incl
            const result= await db.collection('Login').findOne({userId:userId},{projection:{_id:0,otp:1,generated:1}})
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    static async updatePassword(userId,password){
        const db=getDb();
        try {
            const updatePassword=await db.collection('Login').updateOne({userId:userId},{$set:{password:password}})
            return updatePassword;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=Login;