const mongoose=require("mongoose");
const user=require("../../models/user");
const usage=require("../../models/usage");
const device=require("../../models/device");
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
        res.send({
            status:200,
            description:"Device not found during this day"
        });
        return;
    }
    
    let z=await device.findOne({deviceID});
    let arr=y.usage;
    let totalwaterusage=0;
    
    let maxIndex=0;
    let maxVal=0;
    for(i=1;i<arr.length;i++){
        totalwaterusage+=(arr[i-1]-arr[i]);
        if(maxVal<arr[i]){
            maxVal=arr[i];
            maxIndex=i;
        }
    }
    console.log(z.maxcapacity);
    totalwaterusage*=z.maxcapacity;

    await y.save();
    res.send({
        status:200,
        description:"Found these stats",
        totalwaterusage:Math.abs(totalwaterusage),
        waterusageeveryhour:Math.abs(totalwaterusage)/24,
        activetime:(i/288)*24
    });
    return;
}