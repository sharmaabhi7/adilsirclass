import { model, Schema } from "mongoose";

const AdminModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  food:[
    {
      foodname:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    userId:{
        type:String,
    }
    }
  ]
});


export default model("user", AdminModel);
