import {MongoClient} from 'mongodb'

const {NEXT_PUBLIC_MONGODB_URI,NEXT_PUBLIC_MONGODB_DB} = process.env

let mongoClient: MongoClient;
const options ={}
let uri = NEXT_PUBLIC_MONGODB_URI;

if(!NEXT_PUBLIC_MONGODB_URI){
    throw new Error("Please define the MONGODB_URI environment inside .env.local");
    
}


if(!NEXT_PUBLIC_MONGODB_DB){
    throw new Error("Please define MONGODB_DB inside environment variable inside .env.local ")
}

export async function connectToDatabase(){

  try {
    if(mongoClient){
        return { mongoClient}
    }
    
    mongoClient = await (new MongoClient(uri!,options)).connect();
    console.log('Just Connected');
  

    return { mongoClient }
    
  } catch (error) {

    console.log(error)
    
  }
} 


