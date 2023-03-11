import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/user';
import { connectMongo } from '../../utils/connectMongo';
import {sign} from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { Models } from 'mongoose';
import withUserProtect from './protected/middleware';
import { serialize } from 'cookie';


type Data = {
  name: string
}


const handler:NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let refreshSecret :string =process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!;
    let accessTokenSecret:string =process.env.NEXT_PUBLIC_JWT_SECRET!
   
    await connectMongo();
    const {  email, password } = req.body
    console.log(email+' email');
    console.log(password+ ' password');

    let user = await User.findOne({ email })

    if(user as Object){
      const results = await  compare(password,user.password)


      
      

      if(results){
        let token =  sign({firstName:user.firstName, email: user.email, id : user.id},accessTokenSecret,{expiresIn:'12h'})
        
       

        let refreshToken  =sign({firstName:user.firstName, email: user.email, id : user.id},refreshSecret,{expiresIn:'1d'});

        await User.updateOne(user,{refreshToken});

        res.setHeader('Set-Cookie', serialize('jwt', refreshToken, {
          // httpOnly: true,
          sameSite:'none',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        }));
        

      
       return res.status(200).json({
            message:"Login Successful",
            data: { firstName: user.firstName, lastName: user.lastName, email: user.email, _id: user._id },
            token
        })
      } 

      


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