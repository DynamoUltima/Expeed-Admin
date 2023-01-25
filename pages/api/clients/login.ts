import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {sign} from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { Model, Models } from 'mongoose';
import { connectMongo } from '../../../utils/connectMongo';
import Client from '../../../models/client';



type Data = {
  name: string
}


const handler:NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    console.log('called')
    await connectMongo();
    const {  email, password } = req.body

    let client = await Client.findOne({ email })

     console.log(client.password);

    if(client ){
      const results = await  compare(password,client.password)
      

      if(results){
        let token =  sign({firstName:client.firstName, email: client.email, id : client.id},'exkabakaba',{expiresIn:'12h'})
        
        console.log('password reults')
        console.log(results)
      // client.select('-password')
      let clientData = await Client.findOne({ email }).select('-password')
      
        return  res.status(200).json({
            message:"Login Successful",
            data: clientData,
            token
        })
      } 

      //{ firstName: client.firstName, lastName: client.lastName, email: client.email,_id :client._id }



    }else{
      return  res.status(200).json({
            message:"Invalid Email",
         
        })

    }

    res.status(200).json({
        message:"Error",
     
    })


  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error })



  }




}

export default handler;