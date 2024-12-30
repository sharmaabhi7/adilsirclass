import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose.connect("mongodb+srv://anandmaurya44444:ironman@cluster0.tfrnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((conn) => {
      console.log(`db connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`error in connected db: ${err.message}`);
    });
};

export default connectToDb; 
