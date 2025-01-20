import express from "express";
import bodyParser from "body-parser";
import adminModel from "./model/admin.model.js";
import ordermodel from "./model/order.model.js";
import connectToDb from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
connectToDb();

app.get("/", (req, res) => {
  res.send("this is abhishek sharma");
});

app.post("/register", async (req, res) => {
  const { email, password, name,phone,cpassword } = req.body;
  try {
    const userExist = await adminModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(password !== cpassword){
    return res.status(400).json({ message: "password and confirm password not match", password, cpassword });
}
    const hashpassword = bcrypt.hashSync(password, 10);
    const user = await adminModel.create({
      email,
      phone,
      password: hashpassword,
      cpassword: hashpassword,
      name,
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const correctpassword = bcrypt.compareSync(password, user.password);
    if (!correctpassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, "sha5566", {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const user = await adminModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Some error occurred", error });
  }
});

// app.post('/order/create',(req,res)=>{

// })

// app.post('/order/create:id', async (req, res) => {
//   const { foodName, price, description } = req.body;
//   const {id} = req.params;
//   const user = await adminModel.findById(id);
//   try {
//     const order = await ordermodel.create({ foodName, price, description });
//     if (!order) {
//       return res.status(404).json({ message: "Order not created" });
//     }
//     return res.status(200).json({ message: "Food added successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ message: "Some error occurred", error });
//   }
// });

app.post("/order/create", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, "sha5566");
  const { foodName, price, description } = req.body;
  try {
    const user = await adminModel.findById(decoded.id);
    if (!user) {
      console.log(error)
      return res.status(404).json({ message: "User not found" });
    }
    const order = await ordermodel.create({
      foodName,
      price,
      description,
      userId: user._id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not creat" });
    }
    return res.status(200).json({ message: "Food added sucessfuly" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Some error occurred", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
