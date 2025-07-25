import mongoose from 'mongoose';

const connectDB = async () => {

    try 
    {
        console.log('Mongo-uri: ', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.error(`db.js Error: ${error.message}`);
        process.exit(1);
    }

}

export default connectDB;