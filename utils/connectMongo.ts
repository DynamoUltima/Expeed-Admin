import mongoose  from "mongoose";

console.log('hi')
console.log(process.env.MONGODB_URI)
export const connectMongo = async() => mongoose.connect('mongodb+srv://Dynamo:RJZ8Y9TamCYwXZh@cluster0.w1is5on.mongodb.net/EXPEED') 