import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstances = await mongoose.connect(process.env.MONGO_URI, {
            dbName: DB_NAME
        })
        console.log(`DB connected to: ${connectionInstances.connection.host}`)
    }catch (e) {
        console.log("database connection error:", e)
        process.exit(1)
    }
}

export {connectDB}