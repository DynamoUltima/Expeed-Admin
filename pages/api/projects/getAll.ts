import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import Order from '../../../models/order';
import { connectMongo } from '../../../utils/connectMongo';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {

      await connectMongo();
        //check if order Id exists
        const orders =  await Order.find()

       return res.status(200).json({ message: 'Successful', orders })

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;