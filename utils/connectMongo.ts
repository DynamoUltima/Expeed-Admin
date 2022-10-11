import mongoose  from "mongoose";


export const connectMongo = async() => mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!) 