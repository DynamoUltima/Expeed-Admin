import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Bid from '../../../models/bid';
import Order from '../../../models/order';

import { connectMongo } from '../../../utils/connectMongo';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {

      await connectMongo();
      const order = await Order.create(req.body);

      if(order._id){
        //check if order Id exists
        const bid =  await Bid.create({bidId:order._id})



       return res.status(200).json({ message: 'created Successfully', order, bidState:bid.bidState })

      }

    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;