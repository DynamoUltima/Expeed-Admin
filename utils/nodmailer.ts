import { createTransport } from  'nodemailer'



export const transport =  createTransport({
    service:'gmail',
    auth: {
        user:'kabakaba.dev@gmail.com',
        pass:'etvtnluawnbarfll'
    }
});

export const mailOptions ={
    from:'kabakaba.dev@gmail.com',
    to:'kabakaba.dev@gmail.com'
}