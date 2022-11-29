import { Schema, model, models } from "mongoose";



const userSchema = new Schema({

    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        trim: true,
        required: true
    },
    // privileges:{
    //     type: [{
    //         type: String,
    //         enum: ['overall','host','coordinator','none']
    //     }],
    //     default: ['none']
    // },
    role: {
        type: [{
            type: String,
            enum: ['admin','provider','client']
        }],
        default: ['client']
    },
   

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const User = models.User || model('User', userSchema);

export default User