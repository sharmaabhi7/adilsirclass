import { model,Schema } from "mongoose";

const OrderModel = new Schema({
    foodName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
    }
})

export default model("Orders",OrderModel)