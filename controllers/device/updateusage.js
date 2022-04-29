const mongoose=require("mongoose");
const user=require("../../models/user");
const usage=require("../../models/usage");
const hashPW=require("../../util/hash");
const authtokengen=require("../../util/tokengenerator");

module.exports= async (req, res)=>{
    let {userid, password, authtoken, deviceID, currentcapacity}=req.body;
    let x=await user.findOne({userid, authtoken});
    if(x===null){
        res.send({
            statuscode:400,
            description:"Invalid auth credentials."
        });
        return;
    }
    
    var today = new Date();
    let date=today.toISOString().substring(0, 10);

    let y=await usage.findOne({deviceID, date});
    if(y===null){
        await new usage({
            userid,
            deviceID,
            date,
            usage:[parseInt(currentcapacity)]
        }).save();
        res.send({
            status:200,
            description:"Updated database"
        });
        return;

    }

    y.usage.push(parseInt(currentcapacity));
    await y.save();
    res.send({
        status:200,
        description:"Updated database"
    });
    return;
}