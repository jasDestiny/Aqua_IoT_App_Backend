const mongoose=require("mongoose");
const user=require("../../models/user");
const hashPW=require("../../util/hash");
const authtokengen=require("../../util/tokengenerator");

module.exports= async (req, res)=>{
    let {userid, password}=req.body;
    password=hashPW(password);
    let x=await user.findOne({userid, password});
    if(x===null){
        res.send({
            statuscode:400,
            description:"Invalid credentials."
        });
        return;
    }
    let authtoken=authtokengen();
    await user.updateOne({userid},{authtoken});

    res.send({
        statuscode:200,
        description:"Logged in successfully.",
        authtoken:authtoken
    })
    return;
}