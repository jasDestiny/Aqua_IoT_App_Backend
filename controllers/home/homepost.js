module.exports=(req, res)=>{
    const {devid, devsecret}=req.body;
    res.json({devid, devsecret});
}