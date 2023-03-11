import { Schema, model, models, Types } from "mongoose";





const clientSchema = new Schema({

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
    campus: {
        type: String,
        default:'No campus'

    },
    city: {
        type: String,

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
            enum: ['Thesis','Proposals', 'Assignment','Term project','Undergraduate application essays','Business proposals','Market research']
        }],
        default: ['Assignment']
    },

    
    role: {
        type: [{
            type: String,
            enum: ['admin', 'provider', 'client','none']
        }],
        default: ['client']
    },
    expertise: [],
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'

    }






}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } })


const Client = models.Client || model('Client', clientSchema);

export default Client