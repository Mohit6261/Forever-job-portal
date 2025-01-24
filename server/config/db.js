import mongoose from "mongoose";

//func to connect to mongodb

const connectDB=async ()=> {
    mongoose.connection.on('connected',()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGO_URI}/job-portal`)
}

export default connectDB