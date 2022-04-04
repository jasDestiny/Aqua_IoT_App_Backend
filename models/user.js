const mongoose=require("mongoose");

const userModel={
    userid:{
        type:String,
        required:[true, "userid is required"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    city:{
        type:String,
        required:[true, "city is required"]
    },
    authtoken:{
        type:String,
        required:[true, "authtoken is required"]
    },
    registeredDevices:{
        type:[String],
    },
}

module.exports=mongoose.model("user", userModel, "user");