import mongoose from "mongoose";
import {DATABASE_URL} from "./env"

const connect = async ()=>{
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "db-acara",
        });
        return Promise.resolve("Connected");
    }catch (error) {
        return Promise.reject("Database connection failed");
    }
}
export default connect;