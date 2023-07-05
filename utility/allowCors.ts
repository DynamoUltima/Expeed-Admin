import Cors from "cors";

 export const cors = Cors({
  // origin: 'http://localhost:3000', 
  methods: ["POST", "GET", "HEAD","PUT","PATCH","DELETE","OPTIONS"],
  // allowedHeaders: ['Content-Type', 'Authorization']
});

export function runMiddleware(req: any, res: any, fn: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}