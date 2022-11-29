import { sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse, } from "next";
 import { NextResponse, NextRequest } from 'next/server'
import { type } from "os";
import User from '../models/user';
import { withAuth } from 'next-auth/middleware'




 export  function middleware(
    req: NextRequest,
): any {
    console.log('----middleware called-----');
    if (req.nextUrl.pathname.startsWith('/about')) {
        // This logic is only applied to /about
        // const response = NextResponse
        // response.json({message:'error'});
        NextResponse.redirect('/')

      }

    const bearerHeader = req.headers.get('authorization');

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader?.split(' ');
        const bearerToken = bearer![1]

        console.log(bearerToken)



        // req.token = bearerToken;
        // const { cookies } = req;
        // const jwt  = cookies.siteJWT;


        //    type data ={firstName:string, email: string, id : any}

        verify(bearerToken, process.env.NEXT_PUBLIC_JWT_SECRET!, async (err: any, decodedToken: any) => {

            if (err) {
                console.log(err);
                return NextResponse.json({ error: "You are not Authorized" })
            }

            User.findById(decodedToken.id).exec((err, user) => {



                if (err || !user) {
                    return NextResponse.json({
                        error: 'User not found'
                    })
                }

                // const response = NextResponse.next()



                //console.log(user)


                NextResponse.next()
            })
        });


    } else {
        return NextResponse.json({ message: "You are not authorized" })
    }

    return NextResponse.next()

};

// export const config = { matcher: ['/signin/:path*'] }

