import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {

        const mongoClient= await connectToDatabase();

         let client =  mongoClient?.mongoClient;
         const db = client?.db('EXPEED');
         const collection = db?.collection('users');

        let results:any = await collection?.find({}).toArray()

         console.log(results)

        
        res.status(200).json(results)
        
    } catch (error) {
      console.log(error);
        
    }



  
}