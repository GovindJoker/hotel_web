import mongoose from "mongoose";


const hotelSchema=mongoose.Schema({
    hotelName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:[{
        type:String,
        required:true
    }],
    room:[{
        roomType:{
            type:String,
            required:true
        },
        images:[{
            type:String,
            required:true
        }],
        price:{
            type:String,
            required:true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
    },
    addedDate: {
        type: Date,
    },
})

export default mongoose.model("Hotels",hotelSchema)