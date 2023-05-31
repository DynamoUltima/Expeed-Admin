import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Project from '../../../models/projects';
import { connectMongo } from '../../../utils/connectMongo';
import Cors from "cors";
import { cors, runMiddleware } from '../../../utility/allowCors';

// const cors = Cors({
//     methods: ["POST", "GET", "HEAD","PUT"],
//   });
  
//   function runMiddleware(req: any, res: any, fn: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
//     return new Promise((resolve, reject) => {
//       fn(req, res, (result: unknown) => {
//         if (result instanceof Error) {
//           return reject(result);
//         }
//         return resolve(result);
//       });
//     });
//   }
 

const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {
  
      await connectMongo();
      await runMiddleware(req, res, cors);
      
        //check if order Id exists
        const {update} = req.query
        const options = { "new": true };

        const updateBody = req.body;
       
        const project =  await Project.findByIdAndUpdate(update,updateBody,options,)
        

       return res.status(200).json({ message: 'Updated Successful', project})

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;