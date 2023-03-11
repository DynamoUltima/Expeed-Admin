import { NextApiRequest, NextApiResponse } from "next";
import Client from "../../models/client";
import User from "../../models/user";
import { sign, verify } from 'jsonwebtoken'
import { connectMongo } from "../../utils/connectMongo";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    await connectMongo();
    const refreshSecret :string =process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!;
    const cookies = req.cookies; 
    if(!cookies.jwt) return  res.status(401).send('Unauthorized')
    console.log('refresh')

    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    //const foundClient = await Client.findOne({refreshToken})
    const foundClient = await User.findOne({refreshToken});

    if(!foundClient) return res.status(403).json({message:'No Client'});

    verify(
        refreshToken,
        refreshSecret,
        (err:any,decoded:any)=>{

            if(err|| foundClient.id!==decoded.id) return res.status(403).send

            let token =  sign({firstName:foundClient.firstName, email: foundClient.email, id : foundClient.id},'exkabakaba',{expiresIn:'12h'});

           return res.json({token})
            
        }

    )

    // const user 



    
  }