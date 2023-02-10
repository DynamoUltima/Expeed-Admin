import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../models/client';


import { connectMongo } from '../../../utils/connectMongo';
import withUserProtect from '../protected/middleware';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

   
    try {
        
         
        await connectMongo();
        

        const {id}= req.body
        
        console.log(id +'id')
        const clients = await Client.findByIdAndDelete(id).select('-__v ')

        // console.log(clients);

        return res.status(200).json({ message: 'Successful', clients })


        //   res.status(200).json({ message: 'Unsucessful',  })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error })
    }

}



export default withUserProtect(handler);
