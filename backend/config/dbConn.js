import mongoose from 'mongoose';
import { logEvents } from '../middleware/logger.js';

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`);
    }catch(err){
        console.log(`Error: ${err.message}`);
        console.log(`Error: ${procces.env.DATABASE_URI}`);
        logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
        process.exit(1);
    }
}

export default connectDB;