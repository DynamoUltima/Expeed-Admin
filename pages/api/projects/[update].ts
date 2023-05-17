import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Project from '../../../models/projects';
import { connectMongo } from '../../../utils/connectMongo';


 

const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {
  
      await connectMongo();
        //check if order Id exists
        const {update} = req.query
        const options = { "new": true };

        const updateBody = req.body;
       
        const bid =  await Project.findByIdAndUpdate(update,updateBody,options,)
        

       return res.status(200).json({ message: 'Successful', bid})

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;