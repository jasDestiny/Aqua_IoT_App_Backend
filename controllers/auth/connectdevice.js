const mongoose=require("mongoose");
const connToken=require("../../models/connect_token");
const randomNumber=require("../../util/randomNumberGenerator");
const deviceIDgenerator=require("../../util/tokengenerator");
module.exports=async (req, res)=>{
    let {deviceSecret}=req.body;
    let returnSecret=randomNumber(10000, 99999);
    let x=await connToken.findOne({deviceSecret:deviceSecret});
    if(x){
        res.send({
            statusCode:400,
            description:"Device Secret already exists, use an alternative number."
        });
        return;
    }
    
    await new connToken({deviceID: deviceIDgenerator(), deviceSecret:deviceSecret, returnSecret:returnSecret}).save();
    res.send({
        statuscode:200,
        description:"Now send the secrets from registered user's side.",
        deviceSecret, returnSecret});
    return;
}             