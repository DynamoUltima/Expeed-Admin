import { hash } from 'bcrypt';
import { generate } from 'generate-password';
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import Client from '../../../models/client';
import { connectMongo } from '../../../utils/connectMongo';
import { connectToDatabase } from '../../../utils/mongodb'
import { mailOptions, transport } from '../../../utils/nodmailer';
import Clients from '../../datatable/clients';
import withUserProtect from '../protected/middleware';

type Data = {
  name: string
}

const handler: NextApiHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {

    await connectMongo();

    // console.log('req body');
    // console.log(req.body);

    const { firstName, lastName, email, expertise, serviceType, campus, phone } = req.body
    const userExist = await Client.exists({ email })
    if (userExist) return res.status(403).json({ error: "Email has already been taken" });

    const generatedpassword = generate({ length: 8, uppercase: false, numbers: true })


    const hashedPassword = await hash(generatedpassword, 10)

    const client = await Client.create({
      firstName,
      lastName,
      email,
      expertise,
      serviceType,
      campus,
      phone,
      createdBy: req.body.profile,
      password: hashedPassword
    });

    client.password = generatedpassword;

    console.log(generatedpassword);

    transport.sendMail({
      ...mailOptions,
      subject: 'Password Generated',
      text: 'This your new Password , feel free to reset at anytime',
      html: `<h1>Your New Password</h1><p>${generatedpassword}</p>`,

    })


    // client.createdBy = req.body.profile


    return res.status(200).json({ message: ' registered successfully', client })

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error })

  }


}

export default withUserProtect(handler);