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
  password: {
    type: String,
    required: true,
  },

});


export default model("   ", AdminModel);
