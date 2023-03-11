import { serialize } from "cookie";
import { verify, sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import { connectMongo } from "../../../utils/connectMongo";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await connectMongo();
    const refreshSecret: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET!;

    // Is the refresh token in the cookies
    const cookies = req.cookies;
    console.log(cookies)
    if (!cookies.jwt) return res.status(204).json({ message: 'No refresh token' });// no content
    console.log('refresh')

    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    //Is the refresh Token in the DB
    const foundClient = await User.findOne({ refreshToken });
    if (!foundClient) {

        res.setHeader('Set-Cookie',
            serialize('jwt', '', {
                // httpOnly: true, enable this on production
                sameSite:'none',
                maxAge: -1,
                path: '/',
            }))

        return res.status(204).json({ message: 'No Client' });
    }

    // const user 

    await User.updateOne(foundClient, { refreshToken: '' });
    res.setHeader('Set-Cookie',
        serialize('jwt', '', {
            // httpOnly: true, enable this on production
            sameSite:'none',
            maxAge: -1,
            path: '/',
        },
    ),)

    return res.status(204).json({ message: 'Logged out' })


}