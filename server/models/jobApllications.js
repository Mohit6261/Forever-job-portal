import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    userId:{type:String,ref:"User",require:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"Company",require:true},
    status:{type:String,default:'Pending'},
    date:{type:Number,require:true}
})

const JobApplication=mongoose.model('jobApplication',jobApplicationSchema)


export default JobApplication