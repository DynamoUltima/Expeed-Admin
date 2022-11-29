import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user';
import { connectMongo } from '../../utils/connectMongo';
import { connectToDatabase } from '../../utils/mongodb'
import { compare, hash } from 'bcrypt'
import { Models } from 'mongoose';
import { sign } from 'jsonwebtoken';


type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {

    // const mongoClient= await connectToDatabase();

    //    let client =  mongoClient?.mongoClient;
    //    const db = client?.db('EXPEED');
    //    const collection = db?.collection('users');

    //    collection?.insertOne({firstName:'Dynamo',lastName:'Ultima',email:'dynamo@gmail.com'})

    await connectMongo();
    const { firstName, lastName, email, password } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) return res.status(403).json({ error: "Email has already been taken" });


    const hashedPassword = await hash(password, 10)
    console.log(hashedPassword);






    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    if (user) {

      

      let token = sign({ firstName: user.firstName, email: user.email, id: user.id }, 'exkabakaba', { expiresIn: '1h' })
    return  res.status(200).
        json({ message: "Success", data: { firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id }, token })

    }




   return res.status(400).json({
      message:"error"
    })





    //   let user = await  collection?.insertOne({firstName:'Joel',lastName:'Lartey',email:'dynamo.joey@gmail.com'})





    //  console.log(user)




  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message })



  }




}

