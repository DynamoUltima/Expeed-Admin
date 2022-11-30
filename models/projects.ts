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


const projectSchema = new Schema({

    projectName: String,
    projectImage:String,
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
  
    createdBy:{
        type:Types.ObjectId,
        ref:'Client'
    }

  
 
}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})


const Project = models.Project || model('Project', projectSchema);

export default Project