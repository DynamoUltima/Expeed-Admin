import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import Order from '../../../models/order';
import Project from '../../../models/projects';
import { connectMongo } from '../../../utils/connectMongo';
import { cors, runMiddleware } from '../../../utility/allowCors';



const handler: NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  try {

    await connectMongo();
    //check if order Id exists
    await runMiddleware(req,res, cors);
    const projects = await Project.find()

    return res.status(200).json({ message: 'Successful',  projects })


    //   res.status(200).json({ message: 'Unsucessful',  })

  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error })
  }

}



export default handler;