const mongoose = require('mongoose');



const conn = async()=>{
 try {
   const db = await mongoose.connect(process.env.MONGO)
   if(db) {
    console.log("connected to MongoDB");
}else{
       console.log("Not connected");
   }
 } catch (error) {
    console.log(error);
 }
}

// Call the function to establish the MongoDB connection
module.exports = conn;


