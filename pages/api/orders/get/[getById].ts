import cors from "cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Project from "../../../../models/projects";
import { runMiddleware } from "../../../../utility/allowCors";
import { connectMongo } from "../../../../utils/connectMongo";
import Order from "../../../../models/order";


const handler: NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  console.log('getById called')
  const { getById } = req.query
  
   

 
  try {

    await connectMongo();
    await runMiddleware(req, res, cors);
    // console.log(req.query)

    //check if order Id exists
    console.log(getById);


    const project = await Order.find({ 'createdBy': getById });


    return res.status(200).json({ message: 'Successful', project })


    //   res.status(200).json({ message: 'Unsucessful',  })

  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error })
  }

}



export default handler;