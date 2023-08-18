const express =require('express')
const app=express()
const cors = require("cors");
const user=require("./mongo")
const mongoose = require("mongoose")
const db=require("./mongo");
// const Mongoclient = require("mongodb").MongoClient;
require('dotenv').config();
app.use(cors());


app.use(express.json());

const uri=process.env.ATLAS_URL;

// mongoose.set("strictQuery",true)
// var database= await mongoose.connect(uri)
//     .then(()=>console.log("db connected"))
//     .catch(e=>console.log("db not connected\n" + e.message));
// mongoose.set("strictQuery",false)
// mongoose.connect(uri,err=>{
//   if(err) throw err;
// })

// const connection = mongoose.connection;

// connection.once("open",()=>{
//   console.log("connected succefully");
// })


var database = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ' + err));



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // async function run(adduser){
  //   const run = await adduser.save();
  //   console.log("run");
  //   res.json({status:"ok"});
  // }

  app.post('/Signup', async(req, res) => {
    console.log(req.body.email);
    // console.log(database);
    const adduser = new user({
            count:req.body.count,
            name:req.body.fname,
            email:req.body.email,
            address:req.body.textarea,
            pass:req.body.pass
    })
    const findmail=await user.findOne({email:req.body.email});
    if(findmail){
      console.log("Email Already exists");
      // res.end();
      res.json({status:"failed"});
    }else{
    adduser.save().then(()=>{
      console.log("inserted successfully");
    });
    res.json({status:"ok"});
  }
  console.log(findmail);
  
  });
  
  app.post('/Login', async(req, res) => {
    console.log(req.body.email+"---");
   globalemail = req.body.email;
    const findmail=await user.findOne({email:req.body.email,pass:req.body.pass});
    console.log(findmail);
    if(findmail){
      res.json({status:"ok"});
      // res.end();
    }else{
    console.log("Invalid operation");
    // res.json({status:"ok"});
    res.json({status:"failed"});

  }
  // console.log(findmail);
  });


  app.post("/LoadChat",async(req,res)=>{
    try{
      console.log(req.body);
      const findmail=await user.findOne({email:req.body.mail});
      console.log(findmail.chat+"&&&");
      console.log(req.body.mail+"***");
      res.json({status:findmail.chat})
    }catch(err){
      console.log(err);
    }
  })

app.post("/EndChat",async (req,res)=> {
  console.log("request" + req.body.Res);
  try{
    let doc=await user.findOne({email:req.body.mail});
    // doc.
    // console.log("response" + doc);
    doc.chat.push(...req.body.Res);
    doc.save();

    res.json({status:doc.doc});
    console.log("chat updated in the database");
  }
  catch(err){
    console.log(err);
  }
})


app.listen(5000,function(req,res){
    console.log("Stating at 5000 server")    
})