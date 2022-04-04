const mongoose=require("mongoose");
const user=require("../../models/user");
const emailValidate=require("../../util/validemail");
const hashPW=require("../../util/hash");
const authtokengen=require("../../util/tokengenerator");

module.exports= async (req, res)=>{
    let {userid, password, city}=req.body;
    let x=await user.findOne({userid});
    password=hashPW(password);
    if(x){
        res.send({
            statuscode:400,
            description:"Use an alternate userid."
        });
        return;
    }

    let y=await emailValidate(userid);
    if(y===null){
        res.send({
            statuscode:400,
            description:"Enter valid email id",
        });
        return;
    }
    let authtoken=authtokengen()

    await new user({
        userid,
        password,
        city,
        authtoken,
        registeredDevices:[]
    }).save();

    res.send({
        status:200,
        description:"User account created successfully.",
        authtoken
    });
    return;
}