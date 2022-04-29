module.exports=async (req, res)=>{
    let {userid, deviceID, date, usage}=req.body;
    res.send(req.body)
}