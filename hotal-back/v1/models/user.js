import mongoose from "mongoose";
import emailValidator from 'email-validator'


const userSchema=new mongoose.Schema({
    userName:{
        required:true,
        type:String
    },
    email:{
        type:String,
        validate:function (){
            return emailValidator.validate(this.email)
        }
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    joiningDate: {
        type: Date,
        default:Date.now()
    },
    userType:{
        type:String,
        required:true,
    }
})

export default mongoose.model('Users',userSchema)