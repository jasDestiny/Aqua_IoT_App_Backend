const mongoose=require("mongoose");
const connectionToken={
    deviceID:{
        type:String,
        required: [true, 'deviceID is required']
    },
    deviceSecret:{
        type:String,
        required: [true, 'deviceSecret is required']
    },
    returnSecret:{
        type:String,
        required:[true, 'returnSecret is required']
    }
}

module.exports=mongoose.model("connToken", connectionToken, "connToken");