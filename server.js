const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app=express();

const port =process.env.PORT || 5000;
connectDb();
// app.get('/api/contacts',(req,res)=>{
//     // res.send("Get all contacts");
//     res.status(200).json({messgae:"Get all contacts"});

// })
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});