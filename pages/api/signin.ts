import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user';
import { connectMongo } from '../../utils/connectMongo';
import {sign} from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { Models } from 'mongoose';
import withUserProtect from './protected/middleware';


type Data = {
  name: string
}


const handler:NextApiHandler = async function handler(
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
    const {  email, password } = req.body

    let user = await User.findOne({ email })

    if(user as Object){
      const results = await  compare(password,user.password)


      
      

      if(results){
        let token =  sign({firstName:user.firstName, email: user.email, id : user.id},'exkabakaba',{expiresIn:'1h'})
        

      //   user = Object.keys( user).filter(key =>
      //     key !== 'password').reduce((obj:any, key) =>
      //     {
      //         obj[key] =  user[key];
      //         return obj;
      //     }, {}
      // );
      //  delete user.password
       return res.status(200).json({
            message:"Login Successful",
            data: { firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id },
            token
        })
      } 

      //{ firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id }
      
    //   else{
    //     res.status(200).json({
    //         message:"Password does not match",
         
    //     })

    // }


    }else{
        res.status(200).json({
            message:"Invalid Email",
         
        })

    }

    // res.status(200).json({
    //     message:"Error",
     
    // })


  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message })



  }




}

export default handler;