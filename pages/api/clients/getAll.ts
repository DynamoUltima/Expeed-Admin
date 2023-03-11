import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../models/client';
import User from '../../../models/user';


import { connectMongo } from '../../../utils/connectMongo';
import withUserProtect from '../protected/middleware';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {


    try {

        await connectMongo();
        //check if order Id exists
        const clients = await User.find({role:{$in:'client'}}).select('-__v -password -refreshToken')

        return res.status(200).json({ message: 'Successful', clients })


        //   res.status(200).json({ message: 'Unsucessful',  })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error })
    }

}



export default handler;

// export default handler;