import mongoose from "mongoose";


export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log("MongoDb Connected");
            
        })

        connection.on('error',(err)=>{
            console.log("MongoDb Connection Error" + err);
            process.exit()
        })
    }catch(error) {
        console.log("Something Went wrong in connection to DB");
        console.log(error);
    }
}