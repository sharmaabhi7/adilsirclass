import express from "express";
const app = express();
import bodyParser from "body-parser";

import adminModel from "./model/admin.model.js";
import connectToDb from "./config/db.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectToDb()
app.get("/", (req, res) => {
  res.send("this is abhishek sharma");
});
app.post("/register",async  (req, res) => {
const {email,password,name}=req.body;
const userExist=await adminModel.findOne({email:email});
if(userExist) {
    return res.status(400).json({message:"user already exist"})
}
const user=await adminModel.create(req.body)
await user.save()
res.status(201).json({user})

  
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is runn ing on the 3000");
});
