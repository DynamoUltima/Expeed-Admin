import { Schema, model, models, Types } from "mongoose";



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
    refreshToken:{
        type :String
    },

    phone: {
        type: String,
        trim: true,
        required: true
    },
    serviceType: {
        type: [{
            type: String,
            enum: ['Thesis','Proposals', 'Assignment','Term project','Undergraduate application essays','Business proposals','Market research','None']
        }],
        default: ['None']
    },
    campus: {
        type: String,
        default:'No campus'

    },
    city: {
        type: String,
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
            enum: ['admin','provider','client','none']
        }],
        default: ['none']
    },
    expertise: [],
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
   

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const User = models.User || model('User', userSchema);

export default User