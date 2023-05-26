import cors from "cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Project from "../../../../models/projects";
import { runMiddleware } from "../../../../utility/allowCors";
import { connectMongo } from "../../../../utils/connectMongo";


const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
     

    try {
  
      await connectMongo();
      await runMiddleware(req, res, cors);
      
        //check if order Id exists
        const {getById} = req.query
        // const options = { "new": true };

        
       
        const project =  await Project.findById(getById)
        

       return res.status(200).json({ message: 'Successful', project})

   
    //   res.status(200).json({ message: 'Unsucessful',  })
 
    } catch (error) {
      console.log(error);
    return res.status(400).json({ error: error })
    }
   
  }



  export default handler;