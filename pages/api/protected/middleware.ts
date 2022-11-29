import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from 'jsonwebtoken'
import User from "../../../models/user";



const withUserProtect =( handler: NextApiHandler) =>  (req:NextApiRequest, res:NextApiResponse) => {
    const bearerHeader = req.headers.authorization;



    if (!bearerHeader) {
        return res.status(401).json({ loggedIn: false, error: 'Missing Auth token' });

    }

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader!.split(' ');

        const bearerToken = bearer[1]

        req.body.token = bearerToken;




try {
    verify(bearerToken, process.env.NEXT_PUBLIC_JWT_SECRET!, async (err, decodedToken: any) => {
        if (err) {
            console.log(err);
            return res.json({ error: "You are not Authorized" })
        }

      User.findById(decodedToken.id).select('firstName lastName' ).exec((err: any, user: any) => {

            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                })
            }

            req.body.profile = user;
            //console.log(user)


            return handler(req, res)


        })
    });
    
} catch (error) {

    console.log(error)
    
}
       

    } else {
        return res.status(403).json({ message: "You are not authorized" })
    }

}


export default withUserProtect