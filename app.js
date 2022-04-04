require('dotenv').config({path:'./.env'});
const express=require("express");
const cors=require("cors");
const app=express();

const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Mongoose connector
const connector = mongoose.connect(process.env.MONGO_CONNECTION);

//Port
const port=process.env.PORT;

//routes-get
app.get("/",require("./controllers/home/home"));

//routes-post
app.post("/", require("./controllers/home/homepost"));
app.post("/connectdevice", require("./controllers/auth/connectdevice"));
app.post("/registerdevice", require("./controllers/auth/registerdevice"));
app.post("/users/signup", require("./controllers/auth/signup"));
app.post("/users/login", require("./controllers/auth/login"));


//connection
app.listen(port, require("./controllers/connection/connection"));

