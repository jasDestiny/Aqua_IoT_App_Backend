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
    date:{
        type:String,
        required:[true, "city is required"]
    },
    usage:{
        type:[Number]
    }
}

module.exports=mongoose.model("usage", devicemodel, "usage");