import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    phNumber:{
        type:Number,
    },
    educationQualification:{
        type:String,
    },
    gender:{
        type: String,
    },
    idNumber:{
        type: String,
    },
    date:{
        type : String
    },
    time:{
        type: String
    },

});


const AdminSchema = mongoose.model("DemoAdminList", adminSchema);
export default AdminSchema;