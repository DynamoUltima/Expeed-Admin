import { Schema, model, models ,Types} from "mongoose";


 


const bidSchema = new Schema({

    bidId:{
        type:Types.ObjectId,
        ref:'Order'
    },
    providers:[
        {
            type:Types.ObjectId,
            ref:'Client'
        }
    ],
    bidState: {
        type: [{
            type: String,
            enum: ['pending','accepted','declined','completed']
        }],
        default: ['pending']
    },
    approvedBy:{
        type:Types.ObjectId,
        ref:'User'
    }

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const Bid = models.Bid || model('Bid', bidSchema);

export default Bid