import { Schema, model, models ,Types} from "mongoose";


 const  mediaSchema =new Schema({
   mediaId:{
    type:Types.ObjectId
   },

   dataType:{
    type:String,
    required:true
   },

   link:{
    type:String,
    required:true,
   },



 })


const orderSchema = new Schema({

    orderTitle: String,
    orderImage:String,
    description:String,
    price:String,
    serviceType:{
        type: [{
            type: String,
            enum: ['Thesis','Proposal','Assignment']
        }],
        default: ['Assignment']
    },

    duration:String,
    campus:String,
    mediaData :{
     type: [mediaSchema]
    },
    orderState: {
        type: [{
            type: String,
            enum: ['pending','accepted','declined','completed']
        }],
        default: ['pending']
    },
  
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const Order = models.Order || model('Order', orderSchema);

export default Order