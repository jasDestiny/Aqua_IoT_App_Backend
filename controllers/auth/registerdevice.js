const mongoose=require("mongoose");
const connToken=require("../../models/connect_token");
const device=require("../../models/device");
const user=require("../../models/user");

module.exports=async (req, res)=>{
    let {userid, authtoken, deviceSecret, returnSecret, maxcapacity}=req.body;
    let x=await user.findOne({userid, authtoken});
    if(x===null){
        res.send({
            status:500,
            description:"Forbidden. Invalid authtoken."
        });
        return;
    }

    let y=await connToken.findOne({deviceSecret, returnSecret});
    if(y===null){
        res.send({
            statusCode:400,
            description:"Invalid secrets"
        });
        return;
    }

    let deviceID=y.deviceID;
    x.registeredDevices.push(deviceID);
    await connToken.deleteOne({deviceSecret, returnSecret});
    await new device({deviceID, userid, maxcapacity}).save();
    await x.save();
    
    res.send({
        statuscode:200,
        deviceID,
        description:"Device is registered for user",
        deviceSecret, returnSecret});
    return;
}