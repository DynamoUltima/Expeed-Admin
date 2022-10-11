import {Schema,model, models} from "mongoose";



const userSchema = new Schema({

    firstName: String,
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    // role:{}
})


const  User = models.User || model('User',userSchema);

export default User