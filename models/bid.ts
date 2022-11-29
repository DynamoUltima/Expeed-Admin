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
   

    duration:String,
   
  
    approvedBy:{
        type:Types.ObjectId,
        ref:'User'
    }

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const Project = models.Bid || model('Bid', bidSchema);

export default Project