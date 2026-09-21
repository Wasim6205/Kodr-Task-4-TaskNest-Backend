import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed"]
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

const taskModel = mongoose.model("tasks",taskSchema)
export default taskModel