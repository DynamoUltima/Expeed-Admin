import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/model';
import { connectMongo } from '../../utils/connectMongo';
import { connectToDatabase } from '../../utils/mongodb'


type Data = {
  name: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
      try {
  
          const mongoClient= await connectToDatabase();
  
        //    let client =  mongoClient?.mongoClient;
        //    const db = client?.db('EXPEED');
        //    const collection = db?.collection('users');

        //    collection?.insertOne({firstName:'Dynamo',lastName:'Ultima',email:'dynamo@gmail.com'})

           await connectMongo();
  
          let user = await  User.create({firstName:'Junior',lastName:'Ultima',email:'junior@gmail.com'})

        //   let user = await  collection?.insertOne({firstName:'Joel',lastName:'Lartey',email:'dynamo.joey@gmail.com'})

          
  
           console.log(user)
  
          
          res.status(200).json({result:user, message:"Success"})
          
      } catch (error:any) {
        console.log(error);
        return res.status(400).json({ error: error.message })


          
      }
  
  
  
    
  }