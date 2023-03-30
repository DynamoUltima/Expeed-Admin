import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user';
import { connectMongo } from '../../utils/connectMongo';
import { connectToDatabase } from '../../utils/mongodb'
import { compare, hash } from 'bcrypt'
import { Models } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';


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
    console.log(req.body)
    const { firstName, lastName, email, password, phone ,role} = req.body
    let refreshSecret: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!;


    const userExist = await User.findOne({ email })
    if (userExist) return res.status(403).json({ error: "Email has already been taken" });


    const hashedPassword = await hash(password, 10)
    console.log(hashedPassword);






    const user = await User.create({ firstName, lastName, email, phone, password: hashedPassword ,role});

    if (user) {



      let token = sign({ firstName: user.firstName, email: user.email, id: user.id }, 'exkabakaba', { expiresIn: '1h' })

      let refreshToken = sign({ firstName: user.firstName, email: user.email, id: user.id }, refreshSecret, { expiresIn: '1d' });
      let results = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).select(' -password -refreshToken');

      res.setHeader('Set-Cookie', serialize('jwt', refreshToken, {
        // httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      }));




      return res.status(200).
        json({ message: "Success", data: results, token })


    }



    return res.status(400).json({
      message: "error"
    })





    //   let user = await  collection?.insertOne({firstName:'Joel',lastName:'Lartey',email:'dynamo.joey@gmail.com'})





    //  console.log(user)




  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message })



  }




}

