import { model,Schema } from "mongoose";

const OrderModel = new Schema({
    name:{
        type:String,
        required:true
    },
    foodvarity:{
        type:String,
        required:true,
        enum:['VEG','NON-VEG'],
    },
    rest:{
        type:String,
        required:true,
        default:"Dahi Handi"
    }
})

export default model("Orders",OrderModel)