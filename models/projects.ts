import { Schema, model, models, Types } from "mongoose";


const mediaSchema = new Schema({
  mediaId: {
    type: Types.ObjectId
  },

  dataType: {
    type: String,
    required: true
  },
  fileName: {
    type: String
  },
  fileSize: {
    type: String,

  },

  link: {
    type: String,
    required: true,
  },




}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } })


const projectSchema = new Schema({

  projectName: String,
  // projectImage: String,
  description: String,
  price: String,
  // expertise: String,
  serviceType: {
    type: [{
      type: String,
      enum: ['Thesis', 'Proposal', 'Assignment']
    }],
    default: ['Assignment']
  },
  orderId: {
    type: String,
  },

  duration: {
    startDate: Date,
    endDate: Date
  },
  // campus: String,
  mediaData: {
    type: [mediaSchema]
  },
  orderState: {
    type: [{
      type: String,
      enum: ['pending', 'accepted', 'declined', 'completed']
    }],
    default: ['pending']
  },

  createdBy: {
    type: Types.ObjectId,
    ref: 'Client'
  }



}, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } })


const Project = models.Project || model('Project', projectSchema);

export default Project