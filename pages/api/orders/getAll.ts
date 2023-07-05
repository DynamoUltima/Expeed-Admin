import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import Order from '../../../models/order';
import { connectMongo } from '../../../utils/connectMongo';

// import { runMiddleware } from '../../../utility/allowCors';


import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD","PUT","PATCH"],
});

function runMiddleware(req: any, res: any, fn: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// const corsOptions = {
//   origin: 'http://example.com', // Replace with the origin(s) you want to allow
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // List the HTTP methods you want to allow
//   allowedHeaders: ['Content-Type', 'Authorization'], // List the headers you want to allow
// };



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {

    // await runMiddleware(req, res, cors);
     

    try {

      await connectMongo(); 
      await runMiddleware(req, res, cors);
      
      
        //check if order Id exists
       const orders =  await Order.find()

      res.status(200).json({ message: 'Successful', orders })

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }

  // export default cors(corsOptions)(handler);

  export default handler;