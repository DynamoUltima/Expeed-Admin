import { sign } from "jsonwebtoken";


const maxAge = 3 * 24 * 60 * 60;
const secret =process.env.NEXT_PUBLIC_JWT_SECRET!
exports.createToken = (id: any) => {
    return sign({ id },secret, {
        expiresIn: maxAge
    });
}