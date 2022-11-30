import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Bid from '../../../models/bid';
import { connectMongo } from '../../../utils/connectMongo';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {

      await connectMongo();
        //check if order Id exists
        const bids =  await Bid.find()

       return res.status(200).json({ message: 'Successful', bids })

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;