const mongoose = require("mongoose");

const ConnectDB = async ()=>{
    try{
        mongoose.get('strictQuery',false)
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected ${conn.connection.host}`);
    }catch(err){
        console.log(err);
    }
}
module.exports = ConnectDB;