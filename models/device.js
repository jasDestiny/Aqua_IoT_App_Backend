const mongoose=require("mongoose");
const devicemodel={
    userid:{
        type:String,
        required:[true, "userid is required"]
    },
    deviceID:{
        type:String,
        required:[true, "password is required"]
    },
    maxcapacity:{
        type:Number,
        required:[true, "city is required"]
    }
}

module.exports=mongoose.model("device", devicemodel, "device");