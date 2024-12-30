import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose.connect("apna url dal le bhai"
    )
    .then((conn) => {
      console.log(`db connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`error in connected db: ${err.message}`);
    });
};

export default connectToDb; 
