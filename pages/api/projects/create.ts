import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Project from '../../../models/projects';
import { connectMongo } from '../../../utils/connectMongo';



const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {

      await connectMongo();
      const project = await Project.create(req.body);
  
  
  
       res.status(200).json({ message: 'created Successfully',project })
      
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;