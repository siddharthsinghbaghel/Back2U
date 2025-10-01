import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    }
    ,
    content:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Lost","Found","Returned"],
        default:"Lost"
    },
    image:{
        type:String
    },
    number:{
        type:String,
        required:true
    }
},{timestamps:true})




export const Report = mongoose.model("Report",reportSchema)