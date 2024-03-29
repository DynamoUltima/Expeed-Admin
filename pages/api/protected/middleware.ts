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
//exkabakaba
//process.env.JWT_SECRET!


try {
    verify(bearerToken,'exkabakaba' , async (err, decodedToken: any) => {
        if (err) {
            console.log(err.message);
            return res.json({message: "You are not Authorized",error:err })
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
    
} catch (error:any) {

    console.log(error)
    
}
       

    } else {
        return res.status(403).json({ message: "You are not authorized" })
    }

}


export default withUserProtect